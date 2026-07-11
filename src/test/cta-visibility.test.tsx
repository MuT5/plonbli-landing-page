import { render, screen } from "@testing-library/react";
import { MotionConfig } from "framer-motion";
import { describe, expect, it } from "vitest";

import { FinalCtaSection, WaitlistSection } from "@/components/landing/WaitlistSection";

describe("conversion CTA visibility", () => {
  it("keeps the waitlist form and final CTA visible before intersection observers fire", () => {
    const { container } = render(
      <MotionConfig reducedMotion="never">
        <WaitlistSection />
        <FinalCtaSection />
      </MotionConfig>,
    );

    const conversionReveals = container.querySelectorAll<HTMLElement>(".conversion-reveal");
    const finalCta = container.querySelector<HTMLElement>('[data-cta-id="final-waitlist"]');

    expect(conversionReveals).toHaveLength(2);
    expect(screen.getByLabelText("Twój e-mail")).toBeVisible();
    expect(screen.getByRole("button", { name: "Powiadom mnie" })).toBeVisible();
    expect(finalCta).toBeVisible();
    expect(finalCta).toHaveClass("button-primary", "final-cta-button");
  });
});
