import { launchCategory } from "../content/launchCategory";
import type { SocialLinkConfig } from "../types/landing";

const siteUrl = "https://odswoich.pl" as const;
const canonicalUrl = `${siteUrl}/` as const;
const name = "Od Swoich";
export const brandHeadlineLines = ["Dobre rzeczy", "mają swój adres."] as const;
export const brandHeadline = brandHeadlineLines.join(" ");
const title = `${name}. ${brandHeadline}`;
const description = launchCategory.searchDescription;
const socialDescription = launchCategory.searchDescription;

// Only owner-confirmed accounts belong here. The footer and JSON-LD share this list.
const socialProfiles: readonly SocialLinkConfig[] = [
  { channel: "x", label: "X · @odswoich", ariaLabel: "Od Swoich w serwisie X (@odswoich)", href: "https://x.com/odswoich" },
];

export const siteMetadata = {
  name,
  author: name,
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
      url: `${siteUrl}/landing/og-od-swoich.jpg`,
      type: "image/jpeg",
      width: 1200,
      height: 630,
      alt: `Logo Od Swoich z zieloną pinezką. ${launchCategory.hero.alt}`,
    },
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: socialDescription,
  },
  organizationLogoUrl: `${siteUrl}/od-swoich-pin-192.webp`,
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
        ...(socialProfiles.length ? { sameAs: socialProfiles.map(({ href }) => href) } : {}),
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
