import { Facebook, Instagram, Mail, Send, Twitter } from "lucide-react";

import { landingContent } from "@/content/landing.pl";
import { siteConfig } from "@/config/site";

const socialLinks = [
  { ...siteConfig.social.instagram, Icon: Instagram },
  { ...siteConfig.social.facebook, Icon: Facebook },
  { ...siteConfig.social.x, Icon: Twitter },
  { ...siteConfig.social.telegramChannel, Icon: Send },
  { ...siteConfig.social.telegramGroup, Icon: Send },
] as const;

export default function SiteFooter() {
  const content = landingContent.footer;

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-ivory)]/75 py-12 sm:py-16">
      <div className="site-container grid gap-10 lg:grid-cols-[1.3fr_.7fr_.8fr]">
        <div>
          <a href={siteConfig.links.home} className="inline-flex items-center gap-3" aria-label="Plonbli — strona główna">
            <img
              src={`${import.meta.env.BASE_URL}plonbliLogoBezTlaKolo-removebg-preview.png`}
              width="52"
              height="52"
              alt=""
              className="size-12 object-contain"
            />
            <span className="font-display text-3xl font-bold text-[var(--color-olive)]">Plonbli</span>
          </a>
          <p className="mt-5 max-w-xl leading-7 text-[var(--color-ink-muted)]">{content.description}</p>
          <p className="mt-5 max-w-xl text-sm leading-6 text-[var(--color-earth)]">{content.disclaimer}</p>
        </div>

        <div>
          <h2 className="text-sm font-extrabold uppercase tracking-[0.16em] text-[var(--color-olive)]">{content.navigationLabel}</h2>
          <nav className="mt-5 flex flex-col gap-3" aria-label="Nawigacja w stopce">
            {landingContent.navigation.items.map((item) => (
              <a key={item.target} className="footer-link" href={siteConfig.links[item.target]}>{item.label}</a>
            ))}
            <a className="footer-link" href={siteConfig.links.waitlist}>{content.waitlistLabel}</a>
          </nav>
        </div>

        <div>
          <h2 className="text-sm font-extrabold uppercase tracking-[0.16em] text-[var(--color-olive)]">{content.contactLabel}</h2>
          <a className="footer-link mt-5 inline-flex items-center gap-2" href={siteConfig.links.contact}>
            <Mail aria-hidden="true" className="size-4" />
            {siteConfig.contact.general}
          </a>
          <a className="footer-link mt-3 block" href={`mailto:${siteConfig.contact.privacy}`}>
            {content.privacyLabel}
          </a>
          <h2 className="mt-8 text-sm font-extrabold uppercase tracking-[0.16em] text-[var(--color-olive)]">{content.socialLabel}</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {socialLinks.map(({ href, ariaLabel, Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={ariaLabel}
                className="inline-flex size-11 items-center justify-center rounded-full border border-[var(--color-border)] bg-white/55 text-[var(--color-olive)] transition hover:-translate-y-0.5 hover:bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-brand)]/25"
              >
                <Icon aria-hidden="true" className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="site-container mt-10 border-t border-[var(--color-border)] pt-6 text-sm text-[var(--color-earth)]">
        © {new Date().getFullYear()} Plonbli. Wszelkie prawa zastrzeżone.
      </div>
    </footer>
  );
}
