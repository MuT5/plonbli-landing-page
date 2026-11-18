import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import HowItWorksSection from "@/components/landing/HowItWorksSection";
import { getAmbientStoryScene, storyScenes } from "@/content/storyScenes";
import { atlasScrollState } from "@/lib/atlas-scroll";

describe("atlas storyboard", () => {
  afterEach(() => vi.restoreAllMocks());

  it("keeps one decorative route on the photo stage and a responsive alternative for every step", () => {
    const { container } = render(<HowItWorksSection />);
    const stage = screen.getByTestId("storyboard-visual");
    expect(stage).toContainElement(screen.getByTestId("atlas-route"));
    expect(stage).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelectorAll("li[data-story-step]")).toHaveLength(3);
    for (const scene of storyScenes) {
      const staticFrame = container.querySelector(`[data-static-scene="${scene.id}"]`)!;
      expect(staticFrame.querySelector("img")).toHaveAttribute("alt", scene.alt);
      expect(staticFrame.querySelector("source")).toHaveAttribute("type", "image/avif");
      expect(stage.querySelector(`[data-storyboard-scene="${scene.id}"] img`)).toHaveAttribute("alt", "");
    }
  });

  it("supports a separate static photo per card when motion is reduced", () => {
    const original = window.matchMedia;
    vi.spyOn(window, "matchMedia").mockImplementation((query) => ({
      ...original(query), matches: query.includes("prefers-reduced-motion"),
    }));
    render(<HowItWorksSection />);
    expect(screen.getByTestId("storyboard-visual").parentElement).toHaveAttribute("data-storyboard-motion", "static");
  });

  it("uses the app illustration in step one but leaves the ambient backdrop unchanged", () => {
    const { container } = render(<HowItWorksSection />);
    const edited = "/landing/atlas-garden-entry-phone-640.webp";

    expect(container.querySelector('[data-storyboard-scene="discovery"] img')).toHaveAttribute("src", edited);
    const still = container.querySelector('[data-static-scene="discovery"] img');
    expect(still).toHaveAttribute("src", edited);
    expect(still).toHaveAttribute("alt", expect.stringContaining("Telefon pokazuje mapę Od Swoich"));
    expect(getAmbientStoryScene("discovery").mobileSrc).toBe("landing/atlas-garden-entry-640.webp");
  });

  it("maps card entry in either direction to a full-strength image as its bottom arrives", () => {
    const state = (secondTop: number) => atlasScrollState([
      { top: -300, height: 200 }, { top: secondTop, height: 200 }, { top: 1400, height: 300 },
    ], 800, 380, true);
    expect(state(800).photos).toEqual([1, 0, 0]);
    expect(state(700).photos).toEqual([0.5, 0.5, 0]);
    expect(state(600).photos).toEqual([0, 1, 0]);
    expect(state(750).photos).toEqual([0.75, 0.25, 0]);
  });

  it("fades copy only after reaching the measured bottom edge of the photo", () => {
    const before = { top: 381, height: 200 };
    const halfway = { top: 280, height: 200 };
    const behind = { top: 180, height: 200 };
    expect(atlasScrollState([before, halfway, behind], 800, 380, true).copy).toEqual([1, 0.5, 0]);
    expect(atlasScrollState([before, halfway, behind], 800, 380, false).copy).toEqual([1, 1, 1]);
  });
});
