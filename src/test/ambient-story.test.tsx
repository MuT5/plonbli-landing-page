import { MotionConfig } from "framer-motion";
import { act, render, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  AmbientStoryChapter,
  AmbientStorySequence,
} from "@/components/landing/AmbientStorySequence";

class SuccessfulImagePreloader {
  onload: (() => void) | null = null;
  onerror: (() => void) | null = null;

  set src(_value: string) {
    queueMicrotask(() => this.onload?.());
  }

  decode() {
    return Promise.resolve();
  }
}

describe("ambient story sequence", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders one decorative responsive scene before scroll activation", () => {
    const { container } = render(
      <MotionConfig reducedMotion="never">
        <AmbientStorySequence>
          <AmbientStoryChapter scene="contact">
            <section>Content</section>
          </AmbientStoryChapter>
        </AmbientStorySequence>
      </MotionConfig>,
    );

    const sequence = container.querySelector("[data-testid='ambient-story-sequence']");
    const scenes = container.querySelectorAll("[data-ambient-story-scene]");
    const source = container.querySelector("source");
    const image = container.querySelector("[data-ambient-story-scene] img");

    expect(sequence).toHaveAttribute("data-ambient-story-active", "contact");
    expect(scenes).toHaveLength(1);
    expect(scenes[0]).toHaveAttribute("data-ambient-story-scene", "contact");
    expect(source).toHaveAttribute("media", "(min-width: 1024px)");
    expect(image).toHaveAttribute("loading", "eager");
    expect(image).toHaveAttribute("fetchpriority", "low");
    expect(image).toHaveAttribute("alt", "");
    expect(image?.closest("[aria-hidden='true']")).not.toBeNull();
  });

  it("activates the prepared scene as each chapter reaches the viewport center", async () => {
    vi.stubGlobal("Image", SuccessfulImagePreloader);

    const { container } = render(
      <MotionConfig reducedMotion="never">
        <AmbientStorySequence>
          <AmbientStoryChapter scene="contact"><section>Waitlist</section></AmbientStoryChapter>
          <AmbientStoryChapter scene="discovery"><section>Discovery</section></AmbientStoryChapter>
          <AmbientStoryChapter scene="offer"><section>Offer</section></AmbientStoryChapter>
          <AmbientStoryChapter scene="contact"><section>Final</section></AmbientStoryChapter>
        </AmbientStorySequence>
      </MotionConfig>,
    );

    const sequence = container.querySelector("[data-testid='ambient-story-sequence']");
    const discovery = container.querySelector("[data-ambient-story-chapter='discovery']");
    const offer = container.querySelector("[data-ambient-story-chapter='offer']");
    const contacts = container.querySelectorAll("[data-ambient-story-chapter='contact']");

    expect(discovery).not.toBeNull();
    expect(offer).not.toBeNull();
    expect(contacts).toHaveLength(2);

    act(() => globalThis.triggerIntersection(discovery!));
    await waitFor(() => expect(sequence).toHaveAttribute("data-ambient-story-active", "discovery"));

    act(() => globalThis.triggerIntersection(offer!));
    await waitFor(() => expect(sequence).toHaveAttribute("data-ambient-story-active", "offer"));

    act(() => globalThis.triggerIntersection(contacts[1]));
    await waitFor(() => expect(sequence).toHaveAttribute("data-ambient-story-active", "contact"));
  });

  it("keeps the outgoing and incoming images mounted during the crossfade", async () => {
    vi.stubGlobal("Image", SuccessfulImagePreloader);

    const { container } = render(
      <MotionConfig reducedMotion="never">
        <AmbientStorySequence>
          <AmbientStoryChapter scene="contact"><section>Waitlist</section></AmbientStoryChapter>
          <AmbientStoryChapter scene="discovery"><section>Discovery</section></AmbientStoryChapter>
        </AmbientStorySequence>
      </MotionConfig>,
    );

    const discovery = container.querySelector("[data-ambient-story-chapter='discovery']");
    expect(discovery).not.toBeNull();

    act(() => globalThis.triggerIntersection(discovery!));

    await waitFor(() => {
      const scenes = Array.from(container.querySelectorAll("[data-ambient-story-scene]"));
      expect(scenes).toHaveLength(2);
      expect(scenes.map((scene) => scene.getAttribute("data-ambient-story-scene"))).toEqual([
        "contact",
        "discovery",
      ]);
    });
  });
});
