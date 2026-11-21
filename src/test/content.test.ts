import { describe, expect, it } from "vitest";

import { siteConfig } from "@/config/site";
import { createLandingContent, landingContent } from "@/content/landing.pl";
import type { LaunchCategory } from "@/content/launchCategory";
import { createStoryScenes, storyScenes } from "@/content/storyScenes";
import type { CtaContent } from "@/types/landing";

const ctas: readonly CtaContent[] = [
  landingContent.hero.primaryCta,
  landingContent.forLocalPlaces.cta,
];

describe("landing content contract", () => {
  it("guides visitors into the atlas without inviting them to subscribe", () => {
    expect(siteConfig.links.howItWorks).toBe("#jak-to-dziala");
    expect(landingContent.hero.primaryCta.target).toBe("howItWorks");
    expect(landingContent.forLocalPlaces.cta.target).toBe("faq");
    expect(JSON.stringify(landingContent)).not.toMatch(/newsletter|lista-oczekujacych|powiadom mnie|zostaw.{0,12}e-mail/i);
  });

  it("resolves every CTA through the central site configuration", () => {
    for (const cta of ctas) {
      expect(Object.prototype.hasOwnProperty.call(siteConfig.links, cta.target)).toBe(true);
    }
  });

  it("can change the featured story without changing the brand or journey", () => {
    const ceramic = (stem: string, label: string) => ({
      desktopSrc: `ceramika/${stem}-960.webp`, mobileSrc: `ceramika/${stem}-640.webp`, label, alt: label,
    });
    const edition: LaunchCategory = {
      hero: { lead: "Poznaj lokalną ceramikę.", asset: "ceramika/wejscie", alt: "Wejście do zakładu garncarskiego." },
      why: ["Za otwartymi drzwiami wiruje koło garncarskie."],
      storyImages: {
        discovery: ceramic("drzwi", "Drzwi garncarni"), offer: ceramic("kubek", "Kubek z gliny"), contact: ceramic("rozmowa", "Rozmowa z garncarką"),
      },
      whoCanJoin: "Osoby, które tworzą ceramikę.",
      availableOffer: "Kubki i miski.",
      searchTitle: "Mapa lokalnej ceramiki",
      searchDescription: "Lokalna ceramika i kontakt z osobami, które ją tworzą.",
    };
    const content = createLandingContent(edition);

    expect(content.hero.title).toBe(landingContent.hero.title);
    expect(content.hero.titleLines.join(" ")).toBe(content.hero.title);
    expect(content.navigation).toEqual(landingContent.navigation);
    expect(content.howItWorks).toEqual(landingContent.howItWorks);
    expect(content.hero.description).toBe(edition.hero.lead);
    expect(content.hero.imageAlt).toBe(edition.hero.alt);
    expect(content.hero.imageLinkLabel).toBe(landingContent.hero.imageLinkLabel);
    expect(content.why.paragraphs).toEqual(edition.why);
    expect(content.faq.items.find(({ id }) => id === "who-can-join")?.answer).toBe(edition.whoCanJoin);
    expect(createStoryScenes(edition).map(({ desktopSrc, alt }) => ({ desktopSrc, alt }))).toEqual(
      Object.values(edition.storyImages).map(({ desktopSrc, alt }) => ({ desktopSrc, alt })),
    );
    expect(JSON.stringify(content)).not.toMatch(/piekar|miód|pasiek|jedzeni|gospodarstw|march|rzodkiew|tunel|warzyw/i);
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
      "rzemios",
      "ceramik",
      "kupuj",
      "kup teraz",
      "koszyk",
      "checkout",
      "marketplace",
      "sprzedawaj",
      "od swoich nie jest sklepem",
      "nie obsługuje płatności",
      "nie przejmuje płatności",
    ];

    for (const phrase of disallowedPhrases) {
      expect(publicCopy).not.toContain(phrase);
    }
  });

  it("keeps the contact email private and allows only the requested legacy group URL", () => {
    const serializedPublicContent = JSON.stringify({ siteConfig, landingContent });

    expect(serializedPublicContent).not.toContain("plonbli@gmail.com");
    expect(Object.prototype.hasOwnProperty.call(siteConfig, "contact")).toBe(false);
    expect(serializedPublicContent.replace('"https://t.me/Plonbligrupa"', '""')).not.toMatch(/plonbli|1YkUnnggkF/i);
  });

  it("keeps the journey at exactly three ordered steps", () => {
    const steps = landingContent.howItWorks.steps;

    expect(steps).toHaveLength(3);
    expect(steps.map((step) => step.number)).toEqual([1, 2, 3]);
    expect(steps.map((step) => step.id)).toEqual(["find-nearby", "check-offer", "contact-directly"]);
    expect(new Set(steps.map((step) => step.id)).size).toBe(3);
  });

  it("states that Od Swoich will be free without limiting the promise to launch", () => {
    const freeAccess = landingContent.faq.items.find((item) => item.id === "free-access");

    expect(freeAccess?.answer).toContain("Korzystanie z\u00A0aplikacji Od\u00A0Swoich będzie bezpłatne");
    expect(freeAccess?.answer.toLowerCase()).not.toContain("na start");
  });

  it("keeps one responsive asset pair for every story scene", () => {
    expect(storyScenes.map((scene) => scene.id)).toEqual(["discovery", "offer", "contact"]);
    expect(new Set(storyScenes.map((scene) => scene.desktopSrc)).size).toBe(3);
    expect(new Set(storyScenes.map((scene) => scene.mobileSrc)).size).toBe(3);

    for (const scene of storyScenes) {
      expect(scene.desktopSrc).toMatch(/\.webp$/);
      expect(scene.mobileSrc).toMatch(/-640\.webp$/);
      expect(scene.alt.trim()).not.toBe("");
    }
  });
});
