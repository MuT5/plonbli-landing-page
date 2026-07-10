import type { SiteConfig } from "@/types/landing";

export const siteConfig = {
  name: "Plonbli",
  locale: "pl-PL",
  language: "pl",
  siteUrl: "https://plonbli.pl",
  links: {
    home: "https://plonbli.pl",
    waitlist: "#lista-oczekujacych",
    howItWorks: "#jak-to-dziala",
    forLocals: "#dla-szukajacych-lokalnie",
    forFarms: "#dla-gospodarstw",
    faq: "#faq",
  },
  social: {
    telegramChannel: {
      label: "Kanał Telegram",
      ariaLabel: "Otwórz kanał Plonbli na Telegramie",
      href: "https://t.me/plonbli",
    },
    telegramGroup: {
      label: "Grupa Telegram",
      ariaLabel: "Otwórz grupę Plonbli na Telegramie",
      href: "https://t.me/Plonbligrupa",
    },
    instagram: {
      label: "Instagram",
      ariaLabel: "Otwórz profil Plonbli na Instagramie",
      href: "https://www.instagram.com/plonbli/",
    },
    facebook: {
      label: "Facebook",
      ariaLabel: "Otwórz stronę Plonbli na Facebooku",
      href: "https://www.facebook.com/share/1YkUnnggkF/",
    },
    x: {
      label: "X",
      ariaLabel: "Otwórz profil Plonbli w serwisie X",
      href: "https://x.com/plonbli",
    },
    youtube: {
      label: "YouTube",
      ariaLabel: "Otwórz kanał Plonbli na YouTube",
      href: "https://www.youtube.com/@Plonbli",
    },
  },
} as const satisfies SiteConfig;
