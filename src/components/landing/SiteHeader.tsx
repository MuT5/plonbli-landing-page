import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { landingContent } from "@/content/landing.pl";
import { siteConfig } from "@/config/site";
import CtaLink from "@/components/landing/CtaLink";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const reducedMotion = Boolean(useReducedMotion());

  useEffect(() => {
    if (!open) return undefined;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        requestAnimationFrame(() => menuButtonRef.current?.focus());
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <>
      <a className="skip-link" href="#tresc-glowna">
        Przejdź do treści
      </a>
      <header className="site-header">
        <div className="site-container flex min-h-[4.5rem] items-center justify-between gap-4 py-3">
          <a href={siteConfig.links.home} aria-label="Strona główna Plonbli" className="flex shrink-0 items-center gap-3">
            <img
              src={`${import.meta.env.BASE_URL}plonbliLogoBezTlaKolo-removebg-preview.png`}
              width="48"
              height="48"
              alt=""
              className="size-11 object-contain"
            />
            <span className="header-brand-name font-display text-2xl font-bold tracking-[-0.02em] text-[var(--color-olive)]">Plonbli</span>
          </a>

          <nav aria-label={landingContent.navigation.ariaLabel} className="hidden items-center gap-7 lg:flex">
            {landingContent.navigation.items.map((item) => (
              <a key={item.target} className="nav-link" href={siteConfig.links[item.target]}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <CtaLink content={landingContent.navigation.cta} className="hidden min-h-11 px-5 sm:inline-flex" />
            <a
              href={siteConfig.links.waitlist}
              className="header-mobile-cta button-primary min-h-10 px-4 text-sm sm:hidden"
              aria-label={landingContent.navigation.cta.ariaLabel}
            >
              Powiadom
            </a>
            <button
              ref={menuButtonRef}
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-ivory)] text-[var(--color-olive)] transition hover:bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-brand)]/25 lg:hidden"
              aria-label={open ? "Zamknij menu" : "Otwórz menu"}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {open ? (
            <motion.nav
              id="mobile-navigation"
              aria-label="Nawigacja mobilna"
              className="mobile-navigation lg:hidden"
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
              animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="site-container flex flex-col gap-1 py-4">
                {landingContent.navigation.items.map((item) => (
                  <a
                    key={item.target}
                    className="rounded-xl px-4 py-3 font-bold text-[var(--color-olive)] transition hover:bg-white/70"
                    href={siteConfig.links[item.target]}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <CtaLink content={landingContent.navigation.cta} className="mt-2 justify-center sm:hidden" onClick={() => setOpen(false)} />
              </div>
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </header>
    </>
  );
}
