import { Facebook, Instagram, Send, Twitter, Youtube } from "lucide-react";

import { landingContent } from "@/content/landing.pl";
import { siteConfig } from "@/config/site";

const socialLinks = [
  { ...siteConfig.social.instagram, Icon: Instagram },
  { ...siteConfig.social.facebook, Icon: Facebook },
  { ...siteConfig.social.x, Icon: Twitter },
  { ...siteConfig.social.youtube, Icon: Youtube },
  { ...siteConfig.social.telegramChannel, Icon: Send },
  { ...siteConfig.social.telegramGroup, Icon: Send },
] as const;

export default function SiteFooter() {
  const content = landingContent.footer;

  return (
    <footer className="site-footer py-12 sm:py-16">
      <div className="site-container relative z-10 grid gap-10 lg:grid-cols-[1.3fr_.7fr_.8fr]">
        <div>
          <a href={siteConfig.links.home} className="inline-flex items-center gap-3" aria-label="Strona główna Plonbli">
            <img
              src={`${import.meta.env.BASE_URL}plonbliLogoBezTlaKolo-removebg-preview.png`}
              width="52"
              height="52"
              alt=""
              className="site-footer-logo size-12 object-contain"
            />
            <span className="font-display text-3xl font-bold text-[var(--color-ivory)]">Plonbli</span>
          </a>
          <p className="site-footer-description mt-5 max-w-xl leading-7">{content.description}</p>
        </div>

        <div>
          <h2 className="site-footer-heading text-sm font-extrabold uppercase tracking-[0.16em]">{content.navigationLabel}</h2>
          <nav className="mt-5 flex flex-col gap-3" aria-label="Nawigacja w stopce">
            {landingContent.navigation.items.map((item) => (
              <a key={item.target} className="footer-link" href={siteConfig.links[item.target]}>{item.label}</a>
            ))}
            <a className="footer-link" href={siteConfig.links.waitlist}>{content.waitlistLabel}</a>
          </nav>
        </div>

        <div>
          <h2 className="site-footer-heading text-sm font-extrabold uppercase tracking-[0.16em]">{content.socialLabel}</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {socialLinks.map(({ href, ariaLabel, Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={ariaLabel}
                className="site-footer-social"
              >
                <Icon aria-hidden="true" className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="site-footer-bottom site-container relative z-10 mt-10 border-t pt-6 text-sm">
        © {new Date().getFullYear()} Plonbli. Wszelkie prawa zastrzeżone.
      </div>
    </footer>
  );
}
