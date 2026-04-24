import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const BASE = "https://www.smokezapper.it";
const LANGS = ["it", "en", "fr", "de", "es"] as const;
type Lang = typeof LANGS[number];

const STATIC_ROUTES: Array<{ path: string; freq: string; prio: string }> = [
  { path: "/", freq: "weekly", prio: "1.0" },
  { path: "/contatti", freq: "monthly", prio: "0.8" },
  { path: "/interventi", freq: "weekly", prio: "0.8" },
  { path: "/scopri", freq: "monthly", prio: "0.8" },
  { path: "/settori", freq: "monthly", prio: "0.8" },
  { path: "/settori/professionale", freq: "monthly", prio: "0.7" },
  { path: "/settori/domestico", freq: "monthly", prio: "0.7" },
  { path: "/settori/industriale", freq: "monthly", prio: "0.7" },
  { path: "/applicazioni", freq: "monthly", prio: "0.8" },
  { path: "/applicazioni/forni-a-legna", freq: "monthly", prio: "0.7" },
  { path: "/applicazioni/braci-carbone", freq: "monthly", prio: "0.7" },
  { path: "/applicazioni/caldaie-biomassa", freq: "monthly", prio: "0.7" },
  { path: "/applicazioni/camini", freq: "monthly", prio: "0.7" },
  { path: "/applicazioni/cappe", freq: "monthly", prio: "0.7" },
  { path: "/applicazioni/forni-industriali", freq: "monthly", prio: "0.7" },
  { path: "/applicazioni/torrefazioni", freq: "monthly", prio: "0.7" },
  { path: "/applicazioni/affumicatori", freq: "monthly", prio: "0.7" },
  { path: "/applicazioni/taglio-laser", freq: "monthly", prio: "0.7" },
  { path: "/applicazioni/forni-elettrici", freq: "monthly", prio: "0.7" },
  { path: "/modelli", freq: "monthly", prio: "0.8" },
  { path: "/professionale/pizzerie", freq: "monthly", prio: "0.7" },
  { path: "/professionale/panifici", freq: "monthly", prio: "0.7" },
  { path: "/professionale/bracerie", freq: "monthly", prio: "0.7" },
  { path: "/professionale/cucine-professionali", freq: "monthly", prio: "0.7" },
  { path: "/domestico/caldaie-biomassa", freq: "monthly", prio: "0.7" },
  { path: "/domestico/camini", freq: "monthly", prio: "0.7" },
  { path: "/domestico/stufe", freq: "monthly", prio: "0.7" },
  { path: "/industriale/torrefazioni", freq: "monthly", prio: "0.7" },
  { path: "/industriale/caseifici", freq: "monthly", prio: "0.7" },
  { path: "/industriale/affumicatori", freq: "monthly", prio: "0.7" },
  { path: "/industriale/forni-industriali", freq: "monthly", prio: "0.7" },
  { path: "/calcolatore", freq: "monthly", prio: "0.7" },
  { path: "/servizi", freq: "monthly", prio: "0.8" },
  { path: "/pulizia-cucine-professionali", freq: "monthly", prio: "0.7" },
  { path: "/disinfestazione-cucine", freq: "monthly", prio: "0.7" },
  { path: "/manutenzione-cucine-industriali", freq: "monthly", prio: "0.7" },
  { path: "/impianti-aspirazione-fumi", freq: "monthly", prio: "0.7" },
  { path: "/interventi-elettrici-cucine", freq: "monthly", prio: "0.7" },
  { path: "/manutenzione-impianti", freq: "monthly", prio: "0.7" },
  { path: "/agevolazioni", freq: "monthly", prio: "0.7" },
  { path: "/agevolazioni/industria-40", freq: "monthly", prio: "0.6" },
  { path: "/agevolazioni/bando-inail-isi", freq: "monthly", prio: "0.6" },
  { path: "/blog", freq: "daily", prio: "0.8" },
  { path: "/partners", freq: "monthly", prio: "0.6" },
];

const loc = (path: string, lang: Lang) =>
  path === "/" ? `${BASE}/${lang}` : `${BASE}/${lang}${path}`;

const escapeXml = (s: string) =>
  s.replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[c]!));

Deno.serve(async () => {
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY")!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const lines: string[] = [];
  lines.push('<?xml version="1.0" encoding="UTF-8"?>');
  lines.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">');

  // Static routes × 5 langs with hreflang alternates
  for (const r of STATIC_ROUTES) {
    for (const lang of LANGS) {
      lines.push("  <url>");
      lines.push(`    <loc>${loc(r.path, lang)}</loc>`);
      for (const alt of LANGS) {
        lines.push(`    <xhtml:link rel="alternate" hreflang="${alt}" href="${loc(r.path, alt)}"/>`);
      }
      lines.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${loc(r.path, "it")}"/>`);
      lines.push(`    <changefreq>${r.freq}</changefreq>`);
      lines.push(`    <priority>${r.prio}</priority>`);
      lines.push("  </url>");
    }
  }

  // Models from DB
  const { data: models } = await supabase.from("models").select("model_id, updated_at");
  if (models) {
    for (const m of models) {
      const path = `/modelli/${m.model_id}`;
      for (const lang of LANGS) {
        lines.push("  <url>");
        lines.push(`    <loc>${loc(path, lang)}</loc>`);
        if (m.updated_at) lines.push(`    <lastmod>${new Date(m.updated_at).toISOString()}</lastmod>`);
        for (const alt of LANGS) {
          lines.push(`    <xhtml:link rel="alternate" hreflang="${alt}" href="${loc(path, alt)}"/>`);
        }
        lines.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${loc(path, "it")}"/>`);
        lines.push("    <changefreq>monthly</changefreq>");
        lines.push("    <priority>0.6</priority>");
        lines.push("  </url>");
      }
    }
  }

  // Blog posts (one URL per language using language-specific slug)
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("slug_it, slug_en, slug_fr, slug_de, slug_es, updated_at, published_at")
    .eq("is_published", true);

  if (posts) {
    for (const p of posts) {
      const slugs: Record<Lang, string> = {
        it: p.slug_it,
        en: p.slug_en,
        fr: p.slug_fr,
        de: p.slug_de,
        es: p.slug_es,
      };
      for (const lang of LANGS) {
        if (!slugs[lang]) continue;
        lines.push("  <url>");
        lines.push(`    <loc>${BASE}/${lang}/blog/${escapeXml(slugs[lang])}</loc>`);
        if (p.updated_at) lines.push(`    <lastmod>${new Date(p.updated_at).toISOString()}</lastmod>`);
        for (const alt of LANGS) {
          if (slugs[alt]) {
            lines.push(`    <xhtml:link rel="alternate" hreflang="${alt}" href="${BASE}/${alt}/blog/${escapeXml(slugs[alt])}"/>`);
          }
        }
        if (slugs.it) {
          lines.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE}/it/blog/${escapeXml(slugs.it)}"/>`);
        }
        lines.push("    <changefreq>weekly</changefreq>");
        lines.push("    <priority>0.7</priority>");
        lines.push("  </url>");
      }
    }
  }

  lines.push("</urlset>");

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
});
