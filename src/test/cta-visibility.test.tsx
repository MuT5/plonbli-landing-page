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

  it("explains the prelaunch status to visitors and place owners without a signup or app link", () => {
    const { container } = render(<App />);
    const hero = container.querySelector(".atlas-intro");
    expect(hero).toHaveTextContent("Zapowiedź atlasu");
    expect(hero?.querySelector(".atlas-caption-link")).toHaveTextContent("Poznaj trzy kroki");
    expect(hero?.querySelector(".atlas-caption-link")).toHaveAttribute("href", "#jak-to-dziala");
    expect(container.querySelector("#dla-lokalnych-miejsc")).toHaveTextContent("Na razie nie przyjmujemy zgłoszeń");
    expect(container.querySelector('[data-faq-answer="who-can-join"]')).toHaveTextContent("Sposób dołączenia podamy na tej stronie");
  });
});
