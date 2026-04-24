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
    const content = getLocalizedField(post, 'content', lang) || '';
    const articleUrl = `${baseUrl}/${lang}/blog/${slug}`;
    const image = post.featured_image || `${baseUrl}/og-image.jpg`;
    const headline = title.length > 110 ? title.slice(0, 107) + '…' : title;
    const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length;

    document.title = `${title} — ZAPPER®`;
    setOrCreateMeta('description', description, true);
    setOrCreateMeta('og:title', title);
    setOrCreateMeta('og:description', description);
    setOrCreateMeta('og:type', 'article');
    setOrCreateMeta('og:url', articleUrl);
    setOrCreateMeta('og:image', image);
    setOrCreateMeta('og:image:alt', title);
    setOrCreateMeta('og:site_name', 'ZAPPER®');
    if (post.published_at) setOrCreateMeta('article:published_time', post.published_at);
    if (post.updated_at) setOrCreateMeta('article:modified_time', post.updated_at);
    if (post.category) setOrCreateMeta('article:section', post.category);

    setOrCreateMeta('twitter:card', 'summary_large_image', true);
    setOrCreateMeta('twitter:site', '@smokezapper', true);
    setOrCreateMeta('twitter:title', title, true);
    setOrCreateMeta('twitter:description', description, true);
    setOrCreateMeta('twitter:image', image, true);

    // Canonical (language-aware)
    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = articleUrl;
    canonical.setAttribute('data-blog', 'true');
    document.head.appendChild(canonical);

    // Hreflang alternates per available language slug
    const langs: Array<'it' | 'en' | 'fr' | 'de' | 'es'> = ['it', 'en', 'fr', 'de', 'es'];
    langs.forEach((l) => {
      const altSlug = getLocalizedField(post, 'slug', l);
      if (!altSlug) return;
      const altLink = document.createElement('link');
      altLink.rel = 'alternate';
      altLink.setAttribute('hreflang', l);
      altLink.href = `${baseUrl}/${l}/blog/${altSlug}`;
      altLink.setAttribute('data-blog', 'true');
      document.head.appendChild(altLink);
    });
    const xDefault = document.createElement('link');
    xDefault.rel = 'alternate';
    xDefault.setAttribute('hreflang', 'x-default');
    xDefault.href = `${baseUrl}/it/blog/${getLocalizedField(post, 'slug', 'it')}`;
    xDefault.setAttribute('data-blog', 'true');
    document.head.appendChild(xDefault);

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline,
      name: title,
      description,
      image: { '@type': 'ImageObject', url: image, width: 1200, height: 630 },
      author: { '@type': 'Organization', name: post.author || 'ZAPPER®', url: baseUrl },
      publisher: {
        '@type': 'Organization',
        name: 'ZAPPER®',
        logo: { '@type': 'ImageObject', url: `${baseUrl}/icon-512.png` },
      },
      datePublished: post.published_at,
      dateModified: post.updated_at || post.published_at,
      mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl },
      url: articleUrl,
      inLanguage: lang,
      articleSection: post.category,
      wordCount,
      isAccessibleForFree: true,
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-blog', 'true');
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      document.querySelectorAll('link[rel="canonical"][data-blog]').forEach(el => el.remove());
      document.querySelectorAll('link[rel="alternate"][data-blog]').forEach(el => el.remove());
      document.querySelectorAll('script[type="application/ld+json"][data-blog]').forEach(el => el.remove());
    };
  }, [post, lang, isList]);

  return null;
};

export default BlogSEO;
