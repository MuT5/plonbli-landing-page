import { render, screen } from "@testing-library/react";
import { MotionConfig } from "framer-motion";
import { describe, expect, it } from "vitest";

import { FinalCtaSection, WaitlistSection } from "@/components/landing/WaitlistSection";

describe("conversion CTA visibility", () => {
  it("keeps both waitlist forms visible with unique IDs before intersection observers fire", () => {
    const { container } = render(
      <MotionConfig reducedMotion="never">
        <WaitlistSection />
        <FinalCtaSection />
      </MotionConfig>,
    );

    const conversionReveals = container.querySelectorAll<HTMLElement>(".conversion-reveal");
    const emailInputs = screen.getAllByLabelText("Twój e-mail");
    const submitButtons = screen.getAllByRole("button", { name: "Powiadom mnie" });
    const finalForm = container.querySelector<HTMLElement>('[data-waitlist-form-variant="compact"]');
    const ids = Array.from(container.querySelectorAll<HTMLElement>("[id]"), (element) => element.id);

    expect(conversionReveals).toHaveLength(2);
    expect(emailInputs).toHaveLength(2);
    expect(submitButtons).toHaveLength(2);
    emailInputs.forEach((input) => expect(input).toBeVisible());
    submitButtons.forEach((button) => expect(button).toBeVisible());
    expect(finalForm).toBeVisible();
    expect(finalForm).not.toHaveClass("waitlist-form-shell");
    expect(container.querySelector("#final-waitlist-email")).toHaveAttribute(
      "aria-describedby",
      "final-waitlist-privacy final-waitlist-feedback",
    );
    expect(new Set(ids).size).toBe(ids.length);
  });
});
