export type HttpsUrl = `https://${string}`;
export type InternalAnchor = `#${string}`;
export type LinkHref = HttpsUrl | InternalAnchor;

export type SiteLinkKey =
  | "home"
  | "howItWorks"
  | "forLocals"
  | "forLocalPlaces"
  | "faq";

export type SocialChannel = "telegramChannel" | "telegramGroup" | "instagram" | "facebook" | "x" | "youtube";

export type LandingCtaId = "hero-how-it-works" | "for-local-places-faq";

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
  readonly channel: SocialChannel;
  readonly label: string;
  readonly ariaLabel: string;
  readonly href: HttpsUrl;
}

export interface SiteConfig {
  readonly name: "Od Swoich";
  readonly copyrightYear: number;
  readonly locale: "pl-PL";
  readonly language: "pl";
  readonly siteUrl: HttpsUrl;
  readonly links: Readonly<Record<SiteLinkKey, LinkHref>>;
  readonly social: readonly SocialLinkConfig[];
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

export interface FaqItem {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
}

export interface LandingContent {
  readonly navigation: Readonly<{
    ariaLabel: string;
    items: readonly NavigationItem[];
  }>;
  readonly hero: Readonly<{
    eyebrow: string;
    title: string;
    titleLines: readonly [string, string];
    description: string;
    primaryCta: CtaContent;
    imageAlt: string;
    imageLinkLabel: string;
  }>;
  readonly why: Readonly<{
    eyebrow: string;
    title: string;
    paragraphs: readonly string[];
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
  readonly forLocalPlaces: Readonly<{
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
  readonly footer: Readonly<{
    description: string;
    navigationLabel: string;
    socialLabel: string;
  }>;
}
