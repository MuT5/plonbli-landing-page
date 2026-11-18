import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import App from "@/App";

describe("discovery CTA visibility", () => {
  it("makes the journey available immediately and never renders a subscription entry point", () => {
    const { container } = render(<App />);
    const cta = container.querySelector('[data-cta-id="hero-how-it-works"]');
    expect(cta).toBeVisible();
    expect(cta).toHaveAttribute("href", "#jak-to-dziala");
    expect(container.querySelector("form, input[type=email], #lista-oczekujacych")).toBeNull();

    const pageLinks = Array.from(container.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'));
    expect(pageLinks.length).toBeGreaterThan(0);
    for (const link of pageLinks) {
      expect(container.querySelector(link.hash)).not.toBeNull();
    }
  });
});
