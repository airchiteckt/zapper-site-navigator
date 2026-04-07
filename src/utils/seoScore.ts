import type { BlogPost } from '@/hooks/useBlogPosts';

export interface SEOCheck {
  label: string;
  passed: boolean;
  detail: string;
  weight: number;
}

export interface SEOResult {
  score: number;
  checks: SEOCheck[];
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
}

const LANGS = ['it', 'en', 'fr', 'de', 'es'] as const;

function getField(post: Partial<BlogPost>, field: string, lang: string): string {
  return ((post as any)[`${field}_${lang}`] as string) || '';
}

function countWords(html: string): number {
  const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  return text ? text.split(' ').length : 0;
}

function countHeadings(html: string, tag: string): number {
  const regex = new RegExp(`<${tag}[^>]*>`, 'gi');
  return (html.match(regex) || []).length;
}

function countLinks(html: string): number {
  return (html.match(/<a[^>]*href/gi) || []).length;
}

export function calculateSEOScore(post: Partial<BlogPost>, lang: string = 'it'): SEOResult {
  const checks: SEOCheck[] = [];

  const title = getField(post, 'title', lang);
  const meta = getField(post, 'meta_description', lang);
  const content = getField(post, 'content', lang);
  const slug = getField(post, 'slug', lang);
  const image = post.featured_image || '';

  checks.push({
    label: 'Titolo',
    passed: title.length >= 30 && title.length <= 65,
    detail: `${title.length} car. (ideale: 30-65)`,
    weight: 10,
  });

  checks.push({
    label: 'Meta Description',
    passed: meta.length >= 80 && meta.length <= 160,
    detail: `${meta.length} car. (ideale: 80-160)`,
    weight: 10,
  });

  const words = countWords(content);
  checks.push({
    label: 'Lunghezza contenuto',
    passed: words >= 600,
    detail: `${words} parole (min. 600)`,
    weight: 15,
  });

  checks.push({
    label: 'Sottotitoli H2',
    passed: countHeadings(content, 'h2') >= 2,
    detail: `${countHeadings(content, 'h2')} trovati (min. 2)`,
    weight: 10,
  });

  checks.push({
    label: 'Immagine copertina',
    passed: !!image,
    detail: image ? 'Presente' : 'Mancante',
    weight: 10,
  });

  checks.push({
    label: 'Link nel contenuto',
    passed: countLinks(content) >= 1,
    detail: `${countLinks(content)} trovati (min. 1)`,
    weight: 5,
  });

  const slugOk = slug.length > 5 && slug.length < 80 && /^[a-z0-9-]+$/.test(slug);
  checks.push({
    label: 'Slug SEO-friendly',
    passed: slugOk,
    detail: slugOk ? `"${slug}"` : 'Problematico',
    weight: 10,
  });

  const allLangsFilled = LANGS.every(l => getField(post, 'title', l).length > 0 && getField(post, 'content', l).length > 0);
  checks.push({
    label: 'Tutte le lingue',
    passed: allLangsFilled,
    detail: `${LANGS.filter(l => getField(post, 'title', l).length > 0 && getField(post, 'content', l).length > 0).length}/5`,
    weight: 10,
  });

  const maxScore = checks.reduce((sum, c) => sum + c.weight, 0);
  const earned = checks.filter(c => c.passed).reduce((sum, c) => sum + c.weight, 0);
  const score = Math.round((earned / maxScore) * 100);
  const grade: SEOResult['grade'] = score >= 90 ? 'A' : score >= 75 ? 'B' : score >= 60 ? 'C' : score >= 40 ? 'D' : 'F';

  return { score, checks, grade };
}

export function getGradeColor(grade: SEOResult['grade']): string {
  switch (grade) {
    case 'A': return 'text-green-600 bg-green-100';
    case 'B': return 'text-blue-600 bg-blue-100';
    case 'C': return 'text-amber-600 bg-amber-100';
    case 'D': return 'text-orange-600 bg-orange-100';
    case 'F': return 'text-red-600 bg-red-100';
  }
}
