export type HttpsUrl = `https://${string}`;
export type InternalAnchor = `#${string}`;
export type LinkHref = HttpsUrl | InternalAnchor;

export type SiteLinkKey =
  | "home"
  | "waitlist"
  | "howItWorks"
  | "forLocals"
  | "forFarms"
  | "faq";

export type SocialChannel = "telegramChannel" | "telegramGroup" | "instagram" | "facebook" | "x" | "youtube";

export type LandingCtaId =
  | "header-waitlist"
  | "hero-waitlist"
  | "hero-how-it-works"
  | "for-farms-waitlist"
  | "final-waitlist";

export type LandingIconName =
  | "map-pin"
  | "search"
  | "message-circle"
  | "calendar-check"
  | "sprout"
  | "leaf"
  | "heart-handshake"
  | "badge-info";

export interface SocialLinkConfig {
  readonly label: string;
  readonly ariaLabel: string;
  readonly href: HttpsUrl;
}

export interface SiteConfig {
  readonly name: "Plonbli";
  readonly locale: "pl-PL";
  readonly language: "pl";
  readonly siteUrl: HttpsUrl;
  readonly links: Readonly<Record<SiteLinkKey, LinkHref>>;
  readonly social: Readonly<Record<SocialChannel, SocialLinkConfig>>;
}

export interface CtaContent {
  readonly id: LandingCtaId;
  readonly label: string;
  readonly ariaLabel: string;
  readonly target: SiteLinkKey;
  readonly variant: "primary" | "secondary" | "text";
}

export interface NavigationItem {
  readonly label: string;
  readonly target: SiteLinkKey;
}

export interface SeoContent {
  readonly title: string;
  readonly description: string;
  readonly openGraphTitle: string;
  readonly openGraphDescription: string;
  readonly openGraphImageAlt: string;
  readonly keywords: readonly string[];
}

export interface BenefitItem {
  readonly id: string;
  readonly icon: LandingIconName;
  readonly title: string;
  readonly description: string;
}

export interface HowItWorksStep {
  readonly id: string;
  readonly number: 1 | 2 | 3;
  readonly icon: LandingIconName;
  readonly title: string;
  readonly description: string;
}

export interface WaitlistFormContent {
  readonly emailLabel: string;
  readonly emailPlaceholder: string;
  readonly submitLabel: string;
  readonly submittingLabel: string;
  readonly privacyNote: string;
  readonly successTitle: string;
  readonly successDescription: string;
  readonly duplicateTitle: string;
  readonly duplicateDescription: string;
  readonly errorTitle: string;
  readonly errorDescription: string;
}

export interface FaqItem {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
}

export interface LandingContent {
  readonly seo: SeoContent;
  readonly navigation: Readonly<{
    ariaLabel: string;
    items: readonly NavigationItem[];
    cta: CtaContent;
  }>;
  readonly hero: Readonly<{
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: CtaContent;
    secondaryCta: CtaContent;
    imageAlt: string;
  }>;
  readonly waitlist: Readonly<{
    eyebrow: string;
    title: string;
    description: string;
    benefits: readonly string[];
    form: WaitlistFormContent;
  }>;
  readonly howItWorks: Readonly<{
    eyebrow: string;
    title: string;
    description: string;
    steps: readonly [HowItWorksStep, HowItWorksStep, HowItWorksStep];
  }>;
  readonly forLocals: Readonly<{
    eyebrow: string;
    title: string;
    description: string;
    benefits: readonly BenefitItem[];
  }>;
  readonly forFarms: Readonly<{
    eyebrow: string;
    title: string;
    description: string;
    benefits: readonly BenefitItem[];
    cta: CtaContent;
  }>;
  readonly faq: Readonly<{
    eyebrow: string;
    title: string;
    description: string;
    items: readonly FaqItem[];
  }>;
  readonly finalCta: Readonly<{
    eyebrow: string;
    title: string;
    description: string;
    cta: CtaContent;
  }>;
  readonly footer: Readonly<{
    description: string;
    navigationLabel: string;
    socialLabel: string;
    waitlistLabel: string;
  }>;
}
