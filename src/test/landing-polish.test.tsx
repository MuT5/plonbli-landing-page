import { MotionConfig } from "framer-motion";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ForLocalPlacesSection, ForLocalsSection } from "@/components/landing/AudienceSections";
import SiteHeader from "@/components/landing/SiteHeader";
import { ClientReadyProvider } from "@/context/client-ready";

describe("landing component polish", () => {
  it("links the new brand to the top and keeps the mobile menu closed initially", () => {
    const { container } = render(<SiteHeader />);

    const home = screen.getByRole("link", { name: "Strona główna serwisu Od Swoich" });
    expect(home).toHaveAttribute("href", "#start");
    expect(home).toHaveTextContent("Od Swoich");
    const menu = screen.getByRole("button", { name: "Otwórz menu" });
    const panel = document.getElementById(menu.getAttribute("aria-controls") ?? "");
    expect(menu).toHaveAttribute("aria-expanded", "false");
    expect(panel).toHaveAttribute("aria-hidden", "true");
    expect(panel?.querySelector('[href="#faq"]')).toHaveAttribute("tabindex", "-1");
    expect(screen.queryByRole("navigation", { name: "Nawigacja mobilna" })).not.toBeInTheDocument();
    expect(container.querySelector('a[href="#lista-oczekujacych"]')).toBeNull();
  });

  it("closes mobile navigation on Escape and returns focus to its control", () => {
    render(<SiteHeader />);

    const menu = screen.getByRole("button", { name: "Otwórz menu" });
    fireEvent.click(menu);
    const panel = screen.getByRole("navigation", { name: "Nawigacja mobilna" });
    const link = within(panel).getByRole("link", { name: "FAQ" });
    expect(menu).toHaveAttribute("aria-expanded", "true");
    expect(link).not.toHaveAttribute("tabindex", "-1");
    link.focus();

    fireEvent.keyDown(link, { key: "Escape" });
    expect(menu).toHaveAttribute("aria-expanded", "false");
    expect(menu).toHaveFocus();
    expect(panel).toHaveAttribute("aria-hidden", "true");
  });

  it("moves focus to a section when following its mobile menu link", () => {
    render(
      <>
        <SiteHeader />
        <section id="faq" aria-label="Pytania" tabIndex={-1} />
      </>,
    );

    const menu = screen.getByRole("button", { name: "Otwórz menu" });
    fireEvent.click(menu);
    const panel = screen.getByRole("navigation", { name: "Nawigacja mobilna" });
    fireEvent.click(within(panel).getByRole("link", { name: "FAQ" }));

    expect(screen.getByRole("region", { name: "Pytania" })).toHaveFocus();
    expect(menu).toHaveAttribute("aria-expanded", "false");
  });

  it("dismisses the mobile menu when focus moves to the page", () => {
    render(
      <>
        <SiteHeader />
        <a href="#main">Treść strony</a>
      </>,
    );

    const menu = screen.getByRole("button", { name: "Otwórz menu" });
    fireEvent.click(menu);
    const panel = screen.getByRole("navigation", { name: "Nawigacja mobilna" });
    fireEvent.blur(within(panel).getByRole("link", { name: "FAQ" }), {
      relatedTarget: screen.getByRole("link", { name: "Treść strony" }),
    });

    expect(menu).toHaveAttribute("aria-expanded", "false");
  });

  it("keeps a native mobile navigation disclosure in the prerender", () => {
    const { container } = render(
      <ClientReadyProvider value={false}>
        <SiteHeader />
      </ClientReadyProvider>,
    );

    const details = container.querySelector("details");
    expect(details?.querySelector("summary")).toHaveTextContent("Menu");
    expect(details?.querySelector('[href="#faq"]')).toHaveTextContent("FAQ");
    expect(container.querySelector("header")).toHaveAttribute("data-static", "true");
    expect(container.querySelector("button")).not.toBeInTheDocument();
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
