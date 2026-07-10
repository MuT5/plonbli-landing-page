import { describe, expect, it } from "vitest";

import { siteConfig } from "@/config/site";
import { landingContent } from "@/content/landing.pl";
import { storyScenes } from "@/content/storyScenes";
import type { CtaContent } from "@/types/landing";

const ctas: readonly CtaContent[] = [
  landingContent.navigation.cta,
  landingContent.hero.primaryCta,
  landingContent.hero.secondaryCta,
  landingContent.forFarms.cta,
  landingContent.finalCta.cta,
];

describe("landing content contract", () => {
  it("uses the waitlist as the primary conversion path", () => {
    expect(siteConfig.links.waitlist).toBe("#lista-oczekujacych");
    expect(landingContent.navigation.cta.target).toBe("waitlist");
    expect(landingContent.hero.primaryCta.target).toBe("waitlist");
    expect(landingContent.forFarms.cta.target).toBe("waitlist");
    expect(landingContent.finalCta.cta.target).toBe("waitlist");
  });

  it("resolves every CTA through the central site configuration", () => {
    for (const cta of ctas) {
      expect(Object.prototype.hasOwnProperty.call(siteConfig.links, cta.target)).toBe(true);
    }
  });

  it("does not expose a test application URL or an appUrl setting", () => {
    const serializedConfig = JSON.stringify(siteConfig).toLowerCase();

    expect(serializedConfig).not.toContain("plonbliapp.vercel.app");
    expect(Object.prototype.hasOwnProperty.call(siteConfig, "appUrl")).toBe(false);
  });

  it("keeps public copy clear of transactional and disallowed wording", () => {
    const publicCopy = JSON.stringify(landingContent).toLowerCase();
    const disallowedPhrases = [
      "producent",
      "pracowni",
      "kupuj",
      "kup teraz",
      "koszyk",
      "checkout",
      "marketplace",
      "sprzedawaj",
      "plonbli nie jest sklepem",
      "nie obsługuje płatności",
      "nie przejmuje płatności",
    ];

    for (const phrase of disallowedPhrases) {
      expect(publicCopy).not.toContain(phrase);
    }
  });

  it("keeps the contact email private and exposes the YouTube channel", () => {
    const serializedPublicContent = JSON.stringify({ siteConfig, landingContent });

    expect(serializedPublicContent).not.toContain("plonbli@gmail.com");
    expect(Object.prototype.hasOwnProperty.call(siteConfig, "contact")).toBe(false);
    expect(siteConfig.social.youtube.href).toBe("https://www.youtube.com/@Plonbli");
  });

  it("keeps the journey at exactly three ordered steps", () => {
    const steps = landingContent.howItWorks.steps;

    expect(steps).toHaveLength(3);
    expect(steps.map((step) => step.number)).toEqual([1, 2, 3]);
    expect(steps.map((step) => step.id)).toEqual(["find-nearby", "check-offer", "contact-directly"]);
    expect(new Set(steps.map((step) => step.id)).size).toBe(3);
  });

  it("keeps one responsive asset pair for every story scene", () => {
    expect(storyScenes.map((scene) => scene.id)).toEqual(["discovery", "offer", "contact"]);
    expect(new Set(storyScenes.map((scene) => scene.desktopSrc)).size).toBe(3);
    expect(new Set(storyScenes.map((scene) => scene.mobileSrc)).size).toBe(3);

    for (const scene of storyScenes) {
      expect(scene.desktopSrc).toMatch(/\.webp$/);
      expect(scene.mobileSrc).toMatch(/-mobile\.webp$/);
      expect(scene.input).toHaveLength(scene.output.length);
    }
  });
});
