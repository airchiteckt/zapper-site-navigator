import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Tag } from 'lucide-react';
import { useBlogPosts, getLocalizedField } from '@/hooks/useBlogPosts';
import BlogSEO from '@/components/blog/BlogSEO';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/SEO';

const CATEGORIES = ['all', 'guide', 'novita', 'tecnica'];

const getCategoryLabel = (cat: string): string => {
  const labels: Record<string, string> = {
    all: 'Tutti',
    general: 'Generale',
    guide: 'Guide',
    novita: 'Novità',
    tecnica: 'Tecnica',
  };
  return labels[cat] || cat;
};

const BlogList = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { data: posts, isLoading } = useBlogPosts(selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <BlogSEO lang="it" isList />
      <SEO
        title="Blog — ZAPPER® Sistemi di Abbattimento Fumi"
        description="Articoli, guide e approfondimenti su abbattimento fumi, filtri elettrostatici e normative ambientali."
        path="/blog"
      />
      <Header />

      <section className="pt-28 pb-16 bg-gradient-to-b from-muted to-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Blog ZAPPER®
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Guide, approfondimenti tecnici e novità dal mondo dell'abbattimento fumi e polveri
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 mb-10">
        <div className="flex flex-wrap gap-2 justify-center">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-accent text-accent-foreground shadow-md'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {getCategoryLabel(cat)}
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 pb-20">
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-2xl overflow-hidden animate-pulse">
                <div className="h-52 bg-muted" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-muted rounded w-1/3" />
                  <div className="h-6 bg-muted rounded w-full" />
                  <div className="h-4 bg-muted rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : posts && posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => {
              const title = getLocalizedField(post, 'title', 'it');
              const description = getLocalizedField(post, 'meta_description', 'it');
              const slug = getLocalizedField(post, 'slug', 'it');

              return (
                <Link
                  key={post.id}
                  to={`/blog/${slug}`}
                  className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border hover:-translate-y-1"
                >
                  {post.featured_image && (
                    <div className="overflow-hidden h-52">
                      <img
                        src={post.featured_image}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Tag className="h-3 w-3" />
                        {getCategoryLabel(post.category)}
                      </span>
                      {post.published_at && (
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(post.published_at).toLocaleDateString('it')}
                        </span>
                      )}
                    </div>
                    <h2 className="text-xl font-semibold text-foreground mb-2 group-hover:text-accent transition-colors line-clamp-2">
                      {title}
                    </h2>
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                      {description}
                    </p>
                    <span className="inline-flex items-center text-accent font-medium text-sm gap-1 group-hover:gap-2 transition-all">
                      Leggi di più
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              Nessun articolo disponibile al momento.
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default BlogList;
