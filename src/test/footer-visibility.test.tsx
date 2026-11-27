import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import SiteFooter from "@/components/landing/SiteFooter";
import { siteConfig } from "@/config/site";

describe("site footer visibility", () => {
  it("renders the footer content and social controls on a solid visual surface", () => {
    render(<SiteFooter />);

    const footer = screen.getByRole("contentinfo");
    const socialLinks = footer.querySelectorAll<HTMLElement>(".site-footer-social");

    expect(footer).toBeVisible();
    expect(footer).toHaveClass("site-footer");
    expect(footer.querySelector("nav")).toBeVisible();
    expect(socialLinks).toHaveLength(2);
    expect(socialLinks[0]).toHaveAttribute("href", "https://x.com/odswoich");
    expect(socialLinks[0]).toHaveTextContent("@odswoich");
    expect(socialLinks[0].querySelector("svg.site-footer-social-mark")).toHaveAttribute("aria-hidden", "true");
    const telegram = within(footer).getByRole("link", { name: "Grupa na Telegramie (Od Swoich)" });
    expect(telegram).toHaveAttribute("href", "https://t.me/OdSwoich");
    expect(telegram).toHaveTextContent("Grupa na Telegramie");
    for (const { ariaLabel, href } of siteConfig.social) {
      const link = within(footer).getByRole("link", { name: ariaLabel });
      expect(link).toBeVisible();
      expect(link).toHaveAttribute("href", href);
    }
  });
});
