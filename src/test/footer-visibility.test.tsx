import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import SiteFooter from "@/components/landing/SiteFooter";

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
  });
});
