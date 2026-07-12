import { render, screen } from "@testing-library/react";
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
    expect(socialLinks).toHaveLength(6);
    socialLinks.forEach((link) => expect(link).toBeVisible());

    const telegramChannel = screen.getByRole("link", { name: siteConfig.social.telegramChannel.ariaLabel });
    const telegramGroup = screen.getByRole("link", { name: siteConfig.social.telegramGroup.ariaLabel });

    expect(telegramChannel.querySelector("svg")).toHaveClass("lucide-send");
    expect(telegramGroup.querySelector("svg")).toHaveClass("lucide-users");
  });
});
