import { fireEvent, render, screen } from "@testing-library/react";
import { MotionConfig } from "framer-motion";
import { describe, expect, it } from "vitest";

import FaqSection from "@/components/landing/FaqSection";

describe("FAQ accordion", () => {
  it("exposes an accessible answer and toggles its expanded state", () => {
    render(
      <MotionConfig reducedMotion="always">
        <FaqSection />
      </MotionConfig>,
    );

    const question = screen.getByRole("button", {
      name: "Czy korzystanie z Plonbli będzie bezpłatne?",
    });

    expect(question).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(question);

    expect(question).toHaveAttribute("aria-expanded", "true");
    const answer = screen.getByRole("region", {
      name: "Czy korzystanie z Plonbli będzie bezpłatne?",
    });

    expect(answer).toHaveTextContent("Korzystanie z Plonbli będzie bezpłatne");
    expect(answer).toHaveAttribute("aria-hidden", "false");

    fireEvent.click(question);

    expect(question).toHaveAttribute("aria-expanded", "false");
    expect(answer).toHaveAttribute("aria-hidden", "true");
  });
});
