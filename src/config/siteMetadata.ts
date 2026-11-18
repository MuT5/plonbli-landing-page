import { launchCategory } from "../content/launchCategory.ts";
import type { SocialLinkConfig } from "../types/landing.ts";

const siteUrl = "https://odswoich.pl" as const;
const canonicalUrl = `${siteUrl}/` as const;
const name = "Od Swoich";
export const brandHeadlineLines = ["Dobre rzeczy", "mają swój adres."] as const;
export const brandHeadline = brandHeadlineLines.join(" ");
const title = `${name}. ${brandHeadline}`;
const description = launchCategory.searchDescription;
const socialDescription = launchCategory.searchDescription;

// Only owner-confirmed destinations belong here. Identity metadata excludes community groups.
const socialProfiles: readonly SocialLinkConfig[] = [
  { channel: "x", label: "@odswoich", ariaLabel: "Od Swoich w serwisie X (@odswoich)", href: "https://x.com/odswoich" },
  { channel: "telegramGroup", label: "Grupa na Telegramie", ariaLabel: "Grupa na Telegramie (Od Swoich)", href: "https://t.me/Plonbligrupa" },
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
  const profileUrls = socialProfiles.filter(({ channel }) => channel !== "telegramGroup").map(({ href }) => href);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteMetadata.canonicalUrl}#organization`,
        name: siteMetadata.name,
        url: siteMetadata.canonicalUrl,
        logo: siteMetadata.organizationLogoUrl,
        ...(profileUrls.length ? { sameAs: profileUrls } : {}),
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
