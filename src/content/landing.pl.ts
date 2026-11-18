import { brandHeadline, brandHeadlineLines, siteMetadata } from "@/config/siteMetadata";
import { launchCategory, type LaunchCategory } from "@/content/launchCategory";
import { applyPolishTypography } from "@/lib/polishTypography";
import type { LandingContent } from "@/types/landing";

const brandInCopy = siteMetadata.name.replace(" ", "\u00A0");

const rawLandingContent = (category: LaunchCategory) => ({
  navigation: {
    ariaLabel: "Główna nawigacja",
    items: [
      { label: "Jak to działa", target: "howItWorks" },
      { label: "Dla szukających lokalnie", target: "forLocals" },
      { label: "Dla lokalnych miejsc", target: "forLocalPlaces" },
      { label: "FAQ", target: "faq" },
    ],
  },
  hero: {
    eyebrow: "Atlas lokalnych miejsc",
    title: brandHeadline,
    titleLines: brandHeadlineLines,
    description: category.hero.lead,
    primaryCta: {
      id: "hero-how-it-works",
      label: "Zobacz, jak to działa",
      ariaLabel: "Zobacz, jak to działa",
      target: "howItWorks",
      variant: "primary",
    },
    imageAlt: category.hero.alt,
    caption: category.hero.caption,
  },
  why: {
    eyebrow: `Dlaczego powstaje ${brandInCopy}?`,
    title: "Można mieszkać tu od lat i nie znać tego miejsca.",
    paragraphs: category.why,
  },
  howItWorks: {
    eyebrow: "Jak to działa",
    title: "Od miejsca do spotkania",
    description: "Wybierasz miejsce, poznajesz ofertę i rozmawiasz z osobą, która za nią stoi.",
    steps: [
      {
        id: "find-nearby",
        number: 1,
        icon: "map-pin",
        title: "Znajdź miejsce w okolicy",
        description: "Rozejrzyj się blisko domu albo na trasie, którą jeździsz na co dzień.",
      },
      {
        id: "check-offer",
        number: 2,
        icon: "search",
        title: "Sprawdź, co oferuje",
        description: "Zobacz, co jest teraz dostępne, zanim wybierzesz się na miejsce.",
      },
      {
        id: "contact-directly",
        number: 3,
        icon: "message-circle",
        title: "Odezwij się bezpośrednio",
        description: "Zapytaj o szczegóły i ustal odbiór z osobą, do której się wybierasz.",
      },
    ],
  },
  forLocals: {
    eyebrow: "Dla ciebie",
    title: "Odkryj miejsca po drodze.",
    description: "Blisko domu, obok pracy, za następnym zakrętem. Poznaj ludzi, których możesz spotkać w swojej okolicy.",
    benefits: [
      {
        id: "nearby-places",
        icon: "map-pin",
        title: "Blisko ciebie",
        description: "Sprawdź, kto działa przy twojej codziennej trasie.",
      },
      {
        id: "source-information",
        icon: "badge-info",
        title: "Przed wizytą",
        description: "Zobacz aktualną ofertę i zdecyduj, gdzie warto zajrzeć.",
      },
      {
        id: "direct-conversation",
        icon: "heart-handshake",
        title: "Rozmowa u źródła",
        description: "O to, czego nie ma w opisie, zapytasz bezpośrednio.",
      },
    ],
  },
  forLocalPlaces: {
    eyebrow: "Dla lokalnych miejsc",
    title: "Daj się znaleźć sąsiadom.",
    description: "Pokaż, czym się zajmujesz i jak do ciebie trafić. Nawet komuś, kto po raz pierwszy słyszy o twoim miejscu.",
    benefits: [
      {
        id: "local-presence",
        icon: "map-pin",
        title: "Twoje miejsce",
        description: "Opowiedz krótko o sobie i wskaż, gdzie można cię znaleźć.",
      },
      {
        id: "current-offer",
        icon: "badge-info",
        title: "Co masz teraz",
        description: "Pokaż, co jest dostępne, i daj znać, kiedy oferta się zmieni.",
      },
      {
        id: "direct-questions",
        icon: "message-circle",
        title: "Kontakt z tobą",
        description: "Odpowiadaj na pytania i ustalaj szczegóły z osobami z okolicy.",
      },
    ],
    cta: {
      id: "for-local-places-faq",
      label: "Pytania o Od Swoich",
      ariaLabel: "Pytania o Od Swoich",
      target: "faq",
      variant: "text",
    },
  },
  faq: {
    eyebrow: "FAQ",
    title: "Warto wiedzieć",
    description: `Najważniejsze informacje o tym, jak będzie działać ${brandInCopy}.`,
    items: [
      {
        id: "direct-purchase",
        question: `Czy w aplikacji ${brandInCopy} będzie można kupować?`,
        answer:
          `${brandInCopy} pomoże znaleźć lokalne miejsce, poznać jego ofertę i nawiązać bezpośredni kontakt. Szczegóły zakupu, odbioru i płatności ustalicie między sobą.`,
      },
      {
        id: "who-can-join",
        question: "Kto będzie mógł dołączyć?",
        answer: category.whoCanJoin,
      },
      {
        id: "available-products",
        question: "Co będzie można znaleźć?",
        answer: category.availableOffer,
      },
      {
        id: "free-access",
        question: `Czy korzystanie z aplikacji ${brandInCopy} będzie bezpłatne?`,
        answer:
          `Tak. Korzystanie z aplikacji ${brandInCopy} będzie bezpłatne. Chcemy, aby odkrywanie lokalnych miejsc i bezpośredni kontakt z ludźmi, którzy za nimi stoją, były dostępne dla każdego.`,
      },
    ],
  },
  footer: {
    description: "Atlas lokalnych miejsc i ludzi, których warto poznać.",
    navigationLabel: "Na tej stronie",
    socialLabel: "Znajdź nas",
  },
} as const satisfies LandingContent);

const nonVisualContentKeys = new Set([
  "id",
  "ariaLabel",
  "imageAlt",
  "target",
  "variant",
  "icon",
]);

export function createLandingContent(category: LaunchCategory): LandingContent {
  return applyPolishTypography(rawLandingContent(category), nonVisualContentKeys);
}

export const landingContent = createLandingContent(launchCategory);
