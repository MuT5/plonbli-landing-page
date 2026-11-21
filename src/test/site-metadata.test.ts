import { describe, expect, it } from "vitest";

import { siteConfig } from "@/config/site";
import { launchCategory } from "@/content/launchCategory";
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
    expect(siteMetadata.canonicalUrl).toBe("https://odswoich.pl/");
    expect(siteConfig.siteUrl).toBe(siteMetadata.siteUrl);
    expect(siteConfig.links.home).toBe("#start");
    expect(siteConfig.social).toEqual(siteMetadata.socialProfiles);
    expect(siteMetadata.socialProfiles.map(({ href }) => href)).toEqual([
      "https://x.com/odswoich",
      "https://t.me/Plonbligrupa",
    ]);
  });

  it("describes the launch category in search metadata without changing the social headline", () => {
    expect(siteMetadata.title).toBe("Od Swoich | Mapa lokalnych gospodarstw i produktów");
    expect(siteMetadata.description).toBe(launchCategory.searchDescription);
    expect(siteMetadata.description).toContain("powstająca mapa lokalnych gospodarstw");
    expect(siteMetadata.openGraph.title).toBe("Od Swoich. Dobre rzeczy mają swój adres.");
    expect(siteMetadata.twitter.title).toBe(siteMetadata.openGraph.title);
  });

  it("publishes an absolute social image with the recommended dimensions", () => {
    expect(siteMetadata.openGraph.image.url).toMatch(/^https:\/\//);
    expect(siteMetadata.openGraph.image.url).toBe(`${siteMetadata.siteUrl}/landing/og-od-swoich.jpg`);
    expect(siteMetadata.openGraph.image.width).toBe(1200);
    expect(siteMetadata.openGraph.image.height).toBe(630);
    expect(siteMetadata.openGraph.image.alt).toContain(launchCategory.hero.alt);
    expect(siteMetadata.openGraph.description).toBe(launchCategory.searchDescription);
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
    expect(organization.logo).toBe(`${siteMetadata.siteUrl}/od-swoich-pin-192.webp`);
    expect(organization).toHaveProperty("sameAs", ["https://x.com/odswoich"]);
    expect(website.url).toBe(siteMetadata.canonicalUrl);
    expect(website.inLanguage).toBe(siteMetadata.locale);
  });
});
