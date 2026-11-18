import { ArrowUpRight, Send } from "lucide-react";

import { landingContent } from "@/content/landing.pl";
import { siteConfig } from "@/config/site";

export default function SiteFooter() {
  const content = landingContent.footer;

  return (
    <footer className="site-footer py-12 sm:py-16">
      <div className="site-container relative z-10 grid gap-10 lg:grid-cols-[1.3fr_.7fr_.8fr]">
        <div>
          <a href={siteConfig.links.home} className="inline-flex items-center gap-3" aria-label={`Strona główna serwisu ${siteConfig.name}`}>
            <img
              src={`${import.meta.env.BASE_URL}od-swoich-pin-96.webp`}
              srcSet={`${import.meta.env.BASE_URL}od-swoich-pin-96.webp 96w, ${import.meta.env.BASE_URL}od-swoich-pin-192.webp 192w`}
              sizes="48px"
              width="52"
              height="52"
              alt=""
              loading="lazy"
              decoding="async"
              className="site-footer-logo size-12 object-contain p-1"
            />
            <span className="font-display text-3xl font-bold text-[var(--color-ivory)]">{siteConfig.name}</span>
          </a>
          <p className="site-footer-description mt-5 max-w-xl leading-7">{content.description}</p>
        </div>

        <div>
          <h2 className="site-footer-heading text-sm font-extrabold uppercase tracking-[0.16em]">{content.navigationLabel}</h2>
          <nav className="mt-5 flex flex-col gap-3" aria-label="Nawigacja w stopce">
            {landingContent.navigation.items.map((item) => (
              <a key={item.target} className="footer-link" href={siteConfig.links[item.target]}>{item.label}</a>
            ))}
          </nav>
        </div>

        {siteConfig.social.length > 0 && <div>
          <h2 className="site-footer-heading text-sm font-extrabold uppercase tracking-[0.16em]">{content.socialLabel}</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {siteConfig.social.map(({ channel, href, label, ariaLabel }) => (
              <a
                key={channel}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={ariaLabel}
                className="site-footer-social"
              >
                {channel === "x" && (
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    className="site-footer-social-mark size-3.5 shrink-0"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.64 7.584H.47l8.6-9.835L0 1.154h7.594l5.243 6.932 6.064-6.933zm-1.29 19.49h2.039L6.488 3.24H4.3z" />
                  </svg>
                )}
                {channel === "telegramGroup" && <Send aria-hidden="true" className="site-footer-social-mark size-3.5 shrink-0" />}
                <span>{label}</span>
                <ArrowUpRight aria-hidden="true" className="size-3.5 shrink-0" />
              </a>
            ))}
          </div>
        </div>}
      </div>
      <div className="site-footer-bottom site-container relative z-10 mt-10 border-t pt-6 text-sm">
        © {siteConfig.copyrightYear} {siteConfig.name}. Wszelkie prawa zastrzeżone.
      </div>
    </footer>
  );
}
