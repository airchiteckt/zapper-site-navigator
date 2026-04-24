import { Helmet } from "react-helmet-async";

const BASE_URL = "https://www.smokezapper.it";

export function OrganizationSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ZAPPER®",
    legalName: "ZAPPER®",
    url: BASE_URL,
    logo: `${BASE_URL}/icon-512.png`,
    image: `${BASE_URL}/icon-512.png`,
    description:
      "ZAPPER® progetta e produce sistemi di abbattimento fumi, odori e polveri con tecnologia wet scrubber ad acqua nebulizzata ad alta pressione.",
    foundingDate: "2015",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+39-081-199-68-436",
        contactType: "customer service",
        email: "info@smokezapper.it",
        areaServed: ["IT", "EU"],
        availableLanguage: ["Italian", "English", "French", "German", "Spanish"],
      },
    ],
    sameAs: [
      "https://www.facebook.com/smokezapper",
      "https://www.instagram.com/smokezapper",
      "https://www.linkedin.com/company/smokezapper",
      "https://www.youtube.com/@smokezapper",
    ],
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
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "2500",
      bestRating: "5",
      worstRating: "1",
    },
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
    "@id": `${BASE_URL}/#localbusiness`,
    name: "ZAPPER®",
    url: BASE_URL,
    logo: `${BASE_URL}/icon-512.png`,
    image: `${BASE_URL}/icon-512.png`,
    telephone: "+39-081-199-68-436",
    email: "info@smokezapper.it",
    description:
      "Sistemi di abbattimento fumi, odori e polveri per ristorazione, residenziale e industria.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IT",
    },
    areaServed: { "@type": "Country", name: "Italy" },
    priceRange: "€€€",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "2500",
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
}

export function WebSiteSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ZAPPER®",
    url: BASE_URL,
    inLanguage: ["it", "en", "fr", "de", "es"],
    publisher: { "@type": "Organization", name: "ZAPPER®" },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
}
