import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useBlogPosts, getLocalizedField } from "@/hooks/useBlogPosts";
import { Button } from "@/components/ui/button";

const getCategoryLabel = (cat: string): string => {
  const labels: Record<string, string> = {
    guide: "Guide",
    novita: "Novità",
    tecnica: "Tecnica",
    general: "Generale",
  };
  return labels[cat] || cat;
};

const BlogSection = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.substring(0, 2) || "it";
  const { data: posts, isLoading } = useBlogPosts();

  const latestPosts = posts?.slice(0, 3);

  if (isLoading) {
    return (
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="h-8 bg-muted rounded w-64 mx-auto mb-4 animate-pulse" />
            <div className="h-5 bg-muted rounded w-96 mx-auto animate-pulse" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-2xl overflow-hidden animate-pulse border border-border">
                <div className="h-48 bg-muted" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-muted rounded w-1/3" />
                  <div className="h-6 bg-muted rounded w-full" />
                  <div className="h-4 bg-muted rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!latestPosts || latestPosts.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container px-4 sm:px-6">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("blog.sectionTitle")}
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            {t("blog.sectionSubtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {latestPosts.map((post) => {
            const title = getLocalizedField(post, "title", lang);
            const description = getLocalizedField(post, "meta_description", lang);
            const slug = getLocalizedField(post, "slug", lang);

            return (
              <Link
                key={post.id}
                to={`/blog/${slug}`}
                className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border hover:-translate-y-1"
              >
                {post.featured_image && (
                  <div className="overflow-hidden h-48">
                    <img
                      src={post.featured_image}
                      alt={title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="p-5 md:p-6">
                  <div className="flex items-center gap-3 mb-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Tag className="h-3 w-3" />
                      {getCategoryLabel(post.category)}
                    </span>
                    {post.published_at && (
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(post.published_at).toLocaleDateString(lang)}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors line-clamp-2">
                    {title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Button variant="outline" size="lg" asChild>
            <Link to="/blog">
              {t("blog.viewAll")}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
