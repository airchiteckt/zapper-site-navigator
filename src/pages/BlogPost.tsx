import { useParams, Link, useSearchParams } from 'react-router-dom';
import { Calendar, ArrowLeft, Tag, Clock, Share2, ChevronRight } from 'lucide-react';
import { useBlogPost, getLocalizedField } from '@/hooks/useBlogPosts';
import BlogSEO from '@/components/blog/BlogSEO';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import NotFound from './NotFound';

const categoryLabels: Record<string, string> = {
  general: 'Generale',
  guide: 'Guide',
  novita: 'Novità',
  tecnica: 'Tecnica',
};

const estimateReadTime = (html: string): number => {
  const text = html.replace(/<[^>]*>/g, '');
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
};

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const isPreview = searchParams.get('preview') === 'true';
  const { data: post, isLoading, error } = useBlogPost(slug || '', 'it', isPreview);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-28 container mx-auto px-4 max-w-3xl">
          <div className="animate-pulse space-y-6">
            <div className="h-4 bg-muted rounded w-1/4" />
            <div className="h-10 bg-muted rounded w-3/4" />
            <div className="h-80 bg-muted rounded-2xl" />
            <div className="space-y-3 pt-6">
              <div className="h-4 bg-muted rounded" />
              <div className="h-4 bg-muted rounded w-5/6" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) return <NotFound />;

  const title = getLocalizedField(post, 'title', 'it');
  const content = getLocalizedField(post, 'content', 'it');
  const metaDesc = getLocalizedField(post, 'meta_description', 'it');
  const readTime = estimateReadTime(content);
  const categoryLabel = categoryLabels[post.category] || post.category;

  const shareArticle = () => {
    if (navigator.share) {
      navigator.share({ title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <BlogSEO post={post} lang="it" />
      <Header />

      {isPreview && !post.is_published && (
        <div className="fixed top-0 left-0 right-0 z-[60] bg-amber-500 text-amber-950 text-center text-sm font-medium py-1.5">
          ⚠️ Anteprima bozza — questo articolo non è ancora pubblicato
        </div>
      )}

      <article className="pt-24 md:pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/blog" className="hover:text-foreground transition-colors">Blog</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium truncate max-w-[200px]">{title}</span>
          </nav>
        </div>

        <header className="container mx-auto px-4 max-w-4xl mb-8">
          <div className="mb-4">
            <span className="inline-flex items-center gap-1.5 bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              <Tag className="h-3 w-3" />
              {categoryLabel}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6">
            {title}
          </h1>

          {metaDesc && (
            <p className="text-lg text-muted-foreground leading-relaxed mb-6 max-w-3xl">
              {metaDesc}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground border-y border-border py-4">
            {post.author && (
              <span className="font-medium text-foreground">{post.author}</span>
            )}
            {post.published_at && (
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                <time dateTime={post.published_at}>
                  {new Date(post.published_at).toLocaleDateString('it', { year: 'numeric', month: 'long', day: 'numeric' })}
                </time>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              <span>{readTime} min di lettura</span>
            </div>
            <button
              onClick={shareArticle}
              className="flex items-center gap-1.5 ml-auto hover:text-foreground transition-colors"
              aria-label="Condividi"
            >
              <Share2 className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Condividi</span>
            </button>
          </div>
        </header>

        {post.featured_image && (
          <div className="container mx-auto px-4 max-w-4xl mb-10">
            <figure className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src={post.featured_image}
                alt={title}
                className="w-full h-auto max-h-[520px] object-cover"
              />
            </figure>
          </div>
        )}

        <div className="container mx-auto px-4 max-w-3xl">
          <div
            className="prose prose-lg max-w-none prose-headings:text-foreground prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-p:text-foreground/85 prose-p:leading-[1.8] prose-a:text-accent prose-a:font-medium prose-strong:text-foreground prose-ul:my-4 prose-li:text-foreground/85 prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          <div className="mt-14 pt-8 border-t border-border">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-medium text-sm transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Torna al blog
            </Link>
          </div>

          <div className="mt-12 bg-accent/5 rounded-2xl p-6 md:p-8 text-center border border-accent/20">
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
              Hai bisogno di un sistema di abbattimento fumi?
            </h3>
            <p className="text-muted-foreground mb-5 max-w-lg mx-auto text-sm">
              Scopri la gamma ZAPPER® di sistemi abbattimento fumi, odori e polveri per ogni settore.
            </p>
            <Link
              to="/contatti"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground font-medium px-6 py-3 rounded-xl transition-colors text-sm"
            >
              Contattaci
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPostPage;
