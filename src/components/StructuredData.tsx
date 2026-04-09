import { Helmet } from "react-helmet-async";

const BASE_URL = "https://www.smokezapper.it";

export function OrganizationSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ZAPPER®",
    url: BASE_URL,
    logo: `${BASE_URL}/icon-512.png`,
    description:
      "ZAPPER® progetta e produce sistemi di abbattimento fumi, odori e polveri con tecnologia wet scrubber ad acqua nebulizzata ad alta pressione.",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["Italian", "English", "French", "German", "Spanish"],
    },
    sameAs: [],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
}

interface BreadcrumbItem {
  name: string;
  href: string;
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.href.startsWith("http") ? item.href : `${BASE_URL}${item.href}`,
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
}

export function ProductSchema({
  name,
  description,
  image,
  url,
}: {
  name: string;
  description: string;
  image?: string;
  url: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image: image || `${BASE_URL}/icon-512.png`,
    url: url.startsWith("http") ? url : `${BASE_URL}${url}`,
    brand: { "@type": "Brand", name: "ZAPPER®" },
    manufacturer: { "@type": "Organization", name: "ZAPPER®" },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
}

export function LocalBusinessSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "ZAPPER®",
    url: BASE_URL,
    logo: `${BASE_URL}/icon-512.png`,
    description:
      "Sistemi di abbattimento fumi, odori e polveri per ristorazione, residenziale e industria.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IT",
    },
    priceRange: "€€€",
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
}
