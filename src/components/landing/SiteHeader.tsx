import { useEffect, useRef, useState, type MouseEventHandler } from "react";
import { Menu, X } from "lucide-react";

import { landingContent } from "@/content/landing.pl";
import { siteConfig } from "@/config/site";
import { useClientReady } from "@/context/client-ready";
import "./site-header.css";

const menuId = "mobile-navigation";
const mobileMenuControl = "mobile-menu-control inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-ivory)] text-[var(--color-olive)] transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand)]";

function MobileLinks({ available, onClick }: { available: boolean; onClick?: MouseEventHandler<HTMLAnchorElement> }) {
  return (
    <div className="site-container flex flex-col gap-1 py-4">
      {landingContent.navigation.items.map((item) => (
        <a
          key={item.target}
          className="rounded-xl px-4 py-3 font-bold text-[var(--color-olive)] transition-colors hover:bg-white/70"
          href={siteConfig.links[item.target]}
          tabIndex={available ? undefined : -1}
          onClick={onClick}
        >
          {item.label}
        </a>
      ))}
    </div>
  );
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  const clientReady = useClientReady();

  useEffect(() => {
    if (!open) return undefined;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !event.defaultPrevented) {
        event.preventDefault();
        menuButtonRef.current?.focus({ preventScroll: true });
        setOpen(false);
      }
    };
    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (!(event.target instanceof Node) || headerRef.current?.contains(event.target)) return;
      if (menuRef.current?.contains(document.activeElement)) {
        menuButtonRef.current?.focus({ preventScroll: true });
      }
      setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 64rem)");
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOnOutsidePointer);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [open]);

  const followMobileLink: MouseEventHandler<HTMLAnchorElement> = (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    // Keep native fragment scrolling/history and move keyboard focus off the closing menu.
    document.getElementById(event.currentTarget.hash.slice(1))?.focus({ preventScroll: true });
    setOpen(false);
  };

  return (
    <>
      <a className="skip-link" href="#tresc-glowna">
        Przejdź do treści
      </a>
      <header
        ref={headerRef}
        className="site-header"
        data-static={!clientReady}
        onBlur={(event) => {
          if (open && event.relatedTarget instanceof Node && !event.currentTarget.contains(event.relatedTarget)) {
            setOpen(false);
          }
        }}
      >
        <div className="site-container flex min-h-[4.5rem] items-center justify-between gap-4 py-3">
          <a href={siteConfig.links.home} aria-label={`Strona główna serwisu ${siteConfig.name}`} className="flex shrink-0 items-center gap-2 sm:gap-3" onClick={open ? followMobileLink : undefined}>
            <img
              src={`${import.meta.env.BASE_URL}od-swoich-pin-96.webp`}
              srcSet={`${import.meta.env.BASE_URL}od-swoich-pin-96.webp 96w, ${import.meta.env.BASE_URL}od-swoich-pin-192.webp 192w`}
              sizes="44px"
              width="48"
              height="48"
              alt=""
              decoding="async"
              className="size-11 object-contain"
            />
            <span className="whitespace-nowrap font-display text-[1.6rem] font-semibold leading-none tracking-[-0.02em] text-[var(--color-brand)] sm:text-[1.85rem]">{siteConfig.name}</span>
          </a>

          <nav aria-label={landingContent.navigation.ariaLabel} className="hidden items-center gap-7 lg:flex">
            {landingContent.navigation.items.map((item) => (
              <a key={item.target} className="nav-link" href={siteConfig.links[item.target]}>
                {item.label}
              </a>
            ))}
          </nav>

          {clientReady ? (
            <button
              ref={menuButtonRef}
              type="button"
              className={`${mobileMenuControl} lg:hidden`}
              aria-label={open ? "Zamknij menu" : "Otwórz menu"}
              aria-expanded={open}
              aria-controls={menuId}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
            </button>
          ) : (
            <details className="mobile-menu-fallback lg:hidden">
              <summary className={mobileMenuControl}>
                <Menu aria-hidden="true" className="size-5" />
                <span className="sr-only">Menu</span>
              </summary>
              <nav className="mobile-navigation" aria-label="Nawigacja mobilna">
                <MobileLinks available />
              </nav>
            </details>
          )}
        </div>

        {clientReady && (
          <nav
            ref={menuRef}
            id={menuId}
            aria-label="Nawigacja mobilna"
            aria-hidden={!open}
            data-open={open}
            className="mobile-navigation mobile-navigation--enhanced lg:hidden"
          >
            <MobileLinks available={open} onClick={followMobileLink} />
          </nav>
        )}
      </header>
    </>
  );
}
