import type { SiteConfig } from "@/types/landing";
import { siteMetadata } from "@/config/siteMetadata";

export const siteConfig = {
  name: siteMetadata.name,
  copyrightYear: siteMetadata.copyrightYear,
  locale: siteMetadata.locale,
  language: siteMetadata.language,
  siteUrl: siteMetadata.siteUrl,
  links: {
    home: siteMetadata.siteUrl,
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
      href: siteMetadata.socialProfiles.telegramChannel,
    },
    telegramGroup: {
      label: "Grupa Telegram",
      ariaLabel: "Otwórz grupę Plonbli na Telegramie",
      href: siteMetadata.socialProfiles.telegramGroup,
    },
    instagram: {
      label: "Instagram",
      ariaLabel: "Otwórz profil Plonbli na Instagramie",
      href: siteMetadata.socialProfiles.instagram,
    },
    facebook: {
      label: "Facebook",
      ariaLabel: "Otwórz stronę Plonbli na Facebooku",
      href: siteMetadata.socialProfiles.facebook,
    },
    x: {
      label: "X",
      ariaLabel: "Otwórz profil Plonbli w serwisie X",
      href: siteMetadata.socialProfiles.x,
    },
    youtube: {
      label: "YouTube",
      ariaLabel: "Otwórz kanał Plonbli na YouTube",
      href: siteMetadata.socialProfiles.youtube,
    },
  },
} as const satisfies SiteConfig;
