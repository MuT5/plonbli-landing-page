import { MotionConfig } from "framer-motion";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ForLocalsSection } from "@/components/landing/AudienceSections";
import SiteHeader from "@/components/landing/SiteHeader";
import { landingContent } from "@/content/landing.pl";

describe("landing component polish", () => {
  it("exposes stable styling hooks for the compact header controls", () => {
    const { container } = render(<SiteHeader />);

    expect(screen.getByText("Plonbli", { selector: "span" })).toHaveClass("header-brand-name");
    expect(container.querySelector(".header-mobile-cta")).toHaveTextContent("Powiadom");
  });

  it("keeps local benefit cards visually non-interactive", () => {
    const { container } = render(
      <MotionConfig reducedMotion="never">
        <ForLocalsSection />
      </MotionConfig>,
    );

    expect(container.querySelectorAll(".benefit-card")).toHaveLength(3);
    expect(container.querySelector(".lucide-arrow-down-right")).not.toBeInTheDocument();
  });

  it("uses the shared launch notification label for the farm CTA", () => {
    expect(landingContent.forFarms.cta.label).toBe("Powiadom mnie o starcie");
  });
});
