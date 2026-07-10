import type { MouseEventHandler } from "react";
import { ArrowRight } from "lucide-react";

import { siteConfig } from "@/config/site";
import type { CtaContent } from "@/types/landing";

interface CtaLinkProps {
  content: CtaContent;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

export default function CtaLink({ content, className = "", onClick }: CtaLinkProps) {
  const href = siteConfig.links[content.target];
  const variantClass =
    content.variant === "primary"
      ? "button-primary"
      : content.variant === "secondary"
        ? "button-secondary"
        : "button-text";
  const external = href.startsWith("https://");

  return (
    <a
      href={href}
      aria-label={content.ariaLabel}
      className={`${variantClass} ${className}`}
      data-cta-id={content.id}
      onClick={onClick}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      <span>{content.label}</span>
      <ArrowRight aria-hidden="true" className="button-icon" />
    </a>
  );
}
