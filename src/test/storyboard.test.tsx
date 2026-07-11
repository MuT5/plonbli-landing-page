import { render, screen } from "@testing-library/react";
import { MotionConfig } from "framer-motion";
import { afterEach, describe, expect, it, vi } from "vitest";

import HowItWorksSection from "@/components/landing/HowItWorksSection";
import { storyScenes } from "@/content/storyScenes";

describe("three-step storyboard", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("keeps one layered crossfade stage when reduced motion is requested", () => {
    vi.spyOn(window, "matchMedia").mockImplementation((query) => ({
      matches: query === "(prefers-reduced-motion)",
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }));

    const { container } = render(
      <MotionConfig reducedMotion="user">
        <HowItWorksSection />
      </MotionConfig>,
    );

    const storyboard = screen.getByTestId("storyboard-visual");
    const scenes = Array.from(container.querySelectorAll<HTMLElement>("[data-storyboard-scene]"));

    expect(storyboard).toHaveAttribute("data-storyboard-motion", "crossfade-only");
    expect(container.querySelector(".story-reduced-collage")).not.toBeInTheDocument();
    expect(container.querySelector(".story-mobile-scene")).not.toBeInTheDocument();
    expect(container.querySelectorAll('source[media="(min-width: 1024px)"]')).toHaveLength(3);
    expect(scenes.map((scene) => scene.dataset.storyboardScene)).toEqual([
      "discovery",
      "offer",
      "contact",
    ]);
    scenes.forEach((scene) => expect(scene.style.transform).toBe(""));
  });

  it("uses complementary ranges so the frame does not dim between steps", () => {
    expect(storyScenes[0].input.slice(-2)).toEqual(storyScenes[1].input.slice(0, 2));
    expect(storyScenes[1].input.slice(-2)).toEqual(storyScenes[2].input.slice(0, 2));
  });
});
