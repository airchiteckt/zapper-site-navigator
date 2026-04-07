import { useEffect } from 'react';
import { BlogPost, getLocalizedField } from '@/hooks/useBlogPosts';

interface BlogSEOProps {
  post?: BlogPost;
  lang: string;
  isList?: boolean;
}

const setOrCreateMeta = (property: string, content: string, isName = false) => {
  const attr = isName ? 'name' : 'property';
  let el = document.querySelector(`meta[${attr}="${property}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

const BlogSEO = ({ post, lang, isList }: BlogSEOProps) => {
  useEffect(() => {
    const baseUrl = 'https://www.smokezapper.it';

    document.querySelectorAll('link[rel="canonical"][data-blog]').forEach(el => el.remove());
    document.querySelectorAll('script[type="application/ld+json"][data-blog]').forEach(el => el.remove());

    if (isList) {
      document.title = 'Blog — ZAPPER® Sistemi di Abbattimento Fumi';
      setOrCreateMeta('description', 'Articoli, guide e approfondimenti su abbattimento fumi, filtri elettrostatici e normative ambientali per pizzerie, bracerie e industria.', true);
      setOrCreateMeta('og:title', document.title);
      setOrCreateMeta('og:type', 'website');
      setOrCreateMeta('og:url', `${baseUrl}/blog`);
      return;
    }

    if (!post) return;

    const title = getLocalizedField(post, 'title', lang);
    const description = getLocalizedField(post, 'meta_description', lang) || title;
    const slug = getLocalizedField(post, 'slug', lang);
    const articleUrl = `${baseUrl}/blog/${slug}`;
    const image = post.featured_image || `${baseUrl}/icon-512.png`;

    document.title = `${title} — ZAPPER®`;
    setOrCreateMeta('description', description, true);
    setOrCreateMeta('og:title', title);
    setOrCreateMeta('og:description', description);
    setOrCreateMeta('og:type', 'article');
    setOrCreateMeta('og:url', articleUrl);
    setOrCreateMeta('og:image', image);
    setOrCreateMeta('og:site_name', 'ZAPPER®');
    if (post.published_at) setOrCreateMeta('article:published_time', post.published_at);

    setOrCreateMeta('twitter:card', 'summary_large_image', true);
    setOrCreateMeta('twitter:title', title, true);
    setOrCreateMeta('twitter:description', description, true);
    setOrCreateMeta('twitter:image', image, true);

    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = articleUrl;
    canonical.setAttribute('data-blog', 'true');
    document.head.appendChild(canonical);

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title,
      description,
      image,
      author: { '@type': 'Organization', name: post.author || 'ZAPPER®' },
      publisher: {
        '@type': 'Organization',
        name: 'ZAPPER®',
        logo: { '@type': 'ImageObject', url: `${baseUrl}/icon-512.png` },
      },
      datePublished: post.published_at,
      dateModified: post.updated_at,
      mainEntityOfPage: articleUrl,
      inLanguage: lang,
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-blog', 'true');
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      document.querySelectorAll('link[rel="canonical"][data-blog]').forEach(el => el.remove());
      document.querySelectorAll('script[type="application/ld+json"][data-blog]').forEach(el => el.remove());
    };
  }, [post, lang, isList]);

  return null;
};

export default BlogSEO;
