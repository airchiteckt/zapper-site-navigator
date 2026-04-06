import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CartDrawer } from "@/components/shop/CartDrawer";
import { useCartStore } from "@/stores/cartStore";
import { storefrontApiRequest, STOREFRONT_PRODUCTS_QUERY, type ShopifyProduct } from "@/lib/shopify";
import { Package, Loader2, Plus } from "lucide-react";
import { toast } from "sonner";

const Shop = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await storefrontApiRequest(STOREFRONT_PRODUCTS_QUERY, { first: 50 });
        setProducts(data?.data?.products?.edges || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 md:pt-24">
        {/* Hero */}
        <section className="bg-zapper-black py-16 md:py-24">
          <div className="container px-4 sm:px-6">
            <div className="flex items-center justify-between">
              <div>
                <Badge className="bg-primary/20 text-primary border-0 mb-4">
                  <Package className="w-3 h-3 mr-1" /> Shop Ricambi
                </Badge>
                <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
                  Ricambi & Consumabili
                </h1>
                <p className="text-lg text-white/70 max-w-xl">
                  Acquista ricambi originali e prodotti consumabili ZAPPER® per mantenere il tuo sistema sempre efficiente.
                </p>
              </div>
              <CartDrawer />
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="py-12 md:py-16">
          <div className="container px-4 sm:px-6">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20">
                <Package className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-foreground mb-2">Nessun prodotto disponibile</h2>
                <p className="text-muted-foreground">I prodotti saranno disponibili a breve.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.node.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const ProductCard = ({ product }: { product: ShopifyProduct }) => {
  const addItem = useCartStore((state) => state.addItem);
  const isLoading = useCartStore((state) => state.isLoading);
  const selectedVariant = product.node.variants.edges[0]?.node;
  const image = product.node.images.edges[0]?.node;
  const price = product.node.priceRange.minVariantPrice;

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    await addItem({
      product,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || [],
    });
    toast.success(`${product.node.title} aggiunto al carrello`);
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/shop/product/${product.node.handle}`}>
        <div className="h-48 bg-muted flex items-center justify-center overflow-hidden">
          {image ? (
            <img src={image.url} alt={image.altText || product.node.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          ) : (
            <Package className="w-16 h-16 text-muted-foreground/30" />
          )}
        </div>
      </Link>
      <CardContent className="p-5">
        <Link to={`/shop/product/${product.node.handle}`}>
          <h3 className="font-display font-semibold text-lg mb-1 text-foreground hover:text-accent transition-colors">
            {product.node.title}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.node.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-foreground">
            €{parseFloat(price.amount).toFixed(2)}
          </span>
          <Button variant="accent" size="sm" onClick={handleAddToCart} disabled={isLoading || !selectedVariant?.availableForSale}>
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Plus className="w-4 h-4 mr-1" /> Aggiungi</>}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Shop;
