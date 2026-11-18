import type { SiteConfig } from "@/types/landing";
import { siteMetadata } from "@/config/siteMetadata";

export const siteConfig = {
  name: siteMetadata.name,
  copyrightYear: siteMetadata.copyrightYear,
  locale: siteMetadata.locale,
  language: siteMetadata.language,
  siteUrl: siteMetadata.siteUrl,
  links: {
    home: "#start",
    howItWorks: "#jak-to-dziala",
    forLocals: "#dla-szukajacych-lokalnie",
    forLocalPlaces: "#dla-lokalnych-miejsc",
    faq: "#faq",
  },
  social: siteMetadata.socialProfiles,
} as const satisfies SiteConfig;
