import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HeroSection from "@/components/landing/HeroSection";
import SiteFooter from "@/components/landing/SiteFooter";
import SiteHeader from "@/components/landing/SiteHeader";
import { landingContent } from "@/content/landing.pl";
import { launchCategory } from "@/content/launchCategory";

describe("responsive landing images", () => {
  it("prioritizes the hero and offers mobile and desktop AVIF/WebP variants", () => {
    const { container } = render(<HeroSection />);
    const image = screen.getByAltText(landingContent.hero.imageAlt);
    const sources = Array.from(container.querySelectorAll("picture source"));
    const stem = launchCategory.hero.asset;

    expect(image).toHaveAttribute("loading", "eager");
    expect(image).toHaveAttribute("fetchpriority", "high");
    expect(image).toHaveAttribute("decoding", "async");
    expect(image).toHaveAttribute("src", expect.stringContaining(`${stem}-1280.webp`));
    expect(image.getAttribute("srcset")).toContain(`${stem}-1536.webp 1536w`);

    expect(sources).toHaveLength(3);
    expect(sources[0]).toHaveAttribute("type", "image/avif");
    expect(sources[0].getAttribute("srcset")).toContain(`${stem}-portrait-960.avif 960w`);
    expect(sources[1]).toHaveAttribute("type", "image/webp");
    expect(sources[1].getAttribute("srcset")).toContain(`${stem}-portrait-960.webp 960w`);
    expect(sources[2]).toHaveAttribute("type", "image/avif");
    expect(sources[2].getAttribute("srcset")).toContain(`${stem}-1536.avif 1536w`);
  });

  it("uses compact responsive logo assets in the header and footer", () => {
    const { container, unmount } = render(<SiteHeader />);
    const headerLogo = container.querySelector<HTMLImageElement>("header img");

    expect(headerLogo).not.toBeNull();
    expect(headerLogo).toHaveAttribute("alt", "");
    expect(headerLogo).toHaveAttribute("src", expect.stringContaining("od-swoich-pin-96.webp"));
    expect(headerLogo?.getAttribute("srcset")).toContain("od-swoich-pin-192.webp 192w");
    expect(headerLogo).toHaveAttribute("decoding", "async");

    unmount();
    const { container: footerContainer } = render(<SiteFooter />);
    const footerLogo = footerContainer.querySelector<HTMLImageElement>("footer img");

    expect(footerLogo).not.toBeNull();
    expect(footerLogo).toHaveAttribute("alt", "");
    expect(footerLogo).toHaveAttribute("loading", "lazy");
    expect(footerLogo?.getAttribute("srcset")).toContain("od-swoich-pin-192.webp 192w");
  });
});
