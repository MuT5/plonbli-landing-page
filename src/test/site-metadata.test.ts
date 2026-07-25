import { describe, expect, it } from "vitest";

import { siteConfig } from "@/config/site";
import {
  createRobotsTxt,
  createSitemapXml,
  createStructuredData,
  siteMetadata,
} from "@/config/siteMetadata";

describe("site metadata contract", () => {
  it("uses one identity and URL source for metadata and visible links", () => {
    expect(siteConfig.name).toBe(siteMetadata.name);
    expect(siteConfig.locale).toBe(siteMetadata.locale);
    expect(siteConfig.siteUrl).toBe(siteMetadata.siteUrl);
    expect(siteConfig.links.home).toBe(siteMetadata.siteUrl);
    expect(siteConfig.social.instagram.href).toBe(siteMetadata.socialProfiles.instagram);
    expect(siteConfig.social.facebook.href).toBe(siteMetadata.socialProfiles.facebook);
  });

  it("publishes an absolute social image with the recommended dimensions", () => {
    expect(siteMetadata.openGraph.image.url).toMatch(/^https:\/\//);
    expect(siteMetadata.openGraph.image.url).toBe(`${siteMetadata.siteUrl}/landing/og-plonbli-logo.jpg`);
    expect(siteMetadata.openGraph.image.width).toBe(1200);
    expect(siteMetadata.openGraph.image.height).toBe(630);
    expect(siteMetadata.twitter.card).toBe("summary_large_image");
  });

  it("derives robots and sitemap URLs from the canonical site metadata", () => {
    expect(createRobotsTxt()).toContain(`Sitemap: ${siteMetadata.siteUrl}/sitemap.xml`);
    expect(createSitemapXml()).toContain(`<loc>${siteMetadata.canonicalUrl}</loc>`);
  });

  it("derives valid Organization and WebSite structured data", () => {
    const structuredData = createStructuredData();
    const [organization, website] = structuredData["@graph"];

    expect(structuredData["@context"]).toBe("https://schema.org");
    expect(organization.url).toBe(siteMetadata.canonicalUrl);
    expect(organization.logo).toBe(`${siteMetadata.siteUrl}/plonbli-logo-192.webp`);
    expect(organization.sameAs).toContain(siteMetadata.socialProfiles.instagram);
    expect(website.url).toBe(siteMetadata.canonicalUrl);
    expect(website.inLanguage).toBe(siteMetadata.locale);
  });
});
