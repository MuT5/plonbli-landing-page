import { MotionConfig } from "framer-motion";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ForLocalPlacesSection, ForLocalsSection } from "@/components/landing/AudienceSections";
import SiteHeader from "@/components/landing/SiteHeader";

describe("landing component polish", () => {
  it("links the new brand to the top and keeps the mobile menu closed initially", () => {
    const { container } = render(<SiteHeader />);

    const home = screen.getByRole("link", { name: "Strona główna serwisu Od Swoich" });
    expect(home).toHaveAttribute("href", "#start");
    expect(home).toHaveTextContent("Od Swoich");
    expect(screen.getByRole("button", { name: "Otwórz menu" })).toHaveAttribute("aria-expanded", "false");
    expect(container.querySelector('a[href="#lista-oczekujacych"]')).toBeNull();
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

  it("preserves old audience bookmarks at the new local-places section", () => {
    const { container } = render(<ForLocalPlacesSection />);
    expect(container.querySelector("#dla-lokalnych-miejsc")).toContainElement(container.querySelector("#dla-gospodarstw"));
    expect(container.querySelector('[data-cta-id="for-local-places-faq"]')).toHaveAttribute("href", "#faq");
  });
});
