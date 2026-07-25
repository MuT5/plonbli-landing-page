const siteUrl = "https://plonbli.pl" as const;
const canonicalUrl = `${siteUrl}/` as const;
const title = "Plonbli. Dobre rzeczy rosną blisko";
const description =
  "Odkrywaj gospodarstwa, pasieki, sady i lokalne piekarnie w swojej okolicy. Poznawaj ich ofertę i pytaj u źródła. Dołącz do listy Plonbli.";
const socialDescription =
  "Odkrywaj miejsca, ludzi i jedzenie z Twojej okolicy. Poznaj Plonbli od pierwszego dnia.";

const socialProfiles = {
  telegramChannel: "https://t.me/plonbli",
  telegramGroup: "https://t.me/Plonbligrupa",
  instagram: "https://www.instagram.com/plonbli/",
  facebook: "https://www.facebook.com/share/1YkUnnggkF/",
  x: "https://x.com/plonbli",
  youtube: "https://www.youtube.com/@Plonbli",
} as const;

export const siteMetadata = {
  name: "Plonbli",
  author: "Plonbli",
  copyrightYear: 2026,
  language: "pl",
  locale: "pl-PL",
  openGraphLocale: "pl_PL",
  siteUrl,
  canonicalUrl,
  title,
  description,
  socialProfiles,
  icons: {
    favicon48: "/favicon-48.png",
    favicon96: "/favicon-96.png",
    appleTouchIcon: "/apple-touch-icon.png",
  },
  openGraph: {
    title,
    description: socialDescription,
    type: "website",
    image: {
      url: `${siteUrl}/landing/og-plonbli-logo.jpg`,
      type: "image/jpeg",
      width: 1200,
      height: 630,
      alt: "Plonbli, lokalne jedzenie i miejsca blisko Ciebie",
    },
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: socialDescription,
  },
  organizationLogoUrl: `${siteUrl}/plonbli-logo-192.webp`,
} as const;

export function createRobotsTxt() {
  return [
    "User-agent: Googlebot",
    "Allow: /",
    "",
    "User-agent: Bingbot",
    "Allow: /",
    "",
    "User-agent: Twitterbot",
    "Allow: /",
    "",
    "User-agent: facebookexternalhit",
    "Allow: /",
    "",
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${siteMetadata.siteUrl}/sitemap.xml`,
    "",
  ].join("\n");
}

export function createSitemapXml() {
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    "  <url>",
    `    <loc>${siteMetadata.canonicalUrl}</loc>`,
    "  </url>",
    "</urlset>",
    "",
  ].join("\n");
}

export function createStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteMetadata.canonicalUrl}#organization`,
        name: siteMetadata.name,
        url: siteMetadata.canonicalUrl,
        logo: siteMetadata.organizationLogoUrl,
        sameAs: [
          siteMetadata.socialProfiles.instagram,
          siteMetadata.socialProfiles.facebook,
          siteMetadata.socialProfiles.x,
          siteMetadata.socialProfiles.youtube,
          siteMetadata.socialProfiles.telegramChannel,
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteMetadata.canonicalUrl}#website`,
        url: siteMetadata.canonicalUrl,
        name: siteMetadata.name,
        inLanguage: siteMetadata.locale,
        publisher: { "@id": `${siteMetadata.canonicalUrl}#organization` },
      },
    ],
  } as const;
}
