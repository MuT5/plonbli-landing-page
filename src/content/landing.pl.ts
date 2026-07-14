import type { LandingContent } from "@/types/landing";

export const landingContent = {
  seo: {
    title: "Plonbli. Dobre jedzenie jest bliżej, niż myślisz",
    description:
      "Odkrywaj gospodarstwa, sady, pasieki, piekarnie i serowarnie w swojej okolicy. Sprawdzaj ich ofertę i rozmawiaj bezpośrednio z ludźmi, którzy za nimi stoją.",
    openGraphTitle: "Plonbli. Dobre jedzenie jest bliżej, niż myślisz",
    openGraphDescription:
      "Odkrywaj lokalne miejsca, sprawdzaj ich sezonową ofertę i rozmawiaj u źródła.",
    openGraphImageAlt: "Plonbli, lokalne jedzenie i miejsca blisko ciebie",
    keywords: [
      "lokalne produkty",
      "lokalne gospodarstwa",
      "żywność z okolicy",
      "rolnicy w okolicy",
      "bezpośredni kontakt z gospodarstwem",
      "Plonbli",
    ],
  },
  navigation: {
    ariaLabel: "Główna nawigacja",
    items: [
      { label: "Jak to działa", target: "howItWorks" },
      { label: "Dla szukających lokalnie", target: "forLocals" },
      { label: "Dla lokalnych miejsc", target: "forFarms" },
      { label: "FAQ", target: "faq" },
    ],
    cta: {
      id: "header-waitlist",
      label: "Powiadom mnie",
      ariaLabel: "Przejdź do formularza listy oczekujących",
      target: "waitlist",
      variant: "primary",
    },
  },
  hero: {
    eyebrow: "Bliżej źródła. Bliżej ludzi.",
    title: "Dobre jedzenie jest bliżej, niż myślisz",
    description:
      "Truskawki z pobliskiego gospodarstwa, miód z pasieki za miastem, chleb z lokalnej piekarni. Plonbli pomaga znaleźć takie miejsca, sprawdzić ich ofertę i nawiązać bezpośredni kontakt.",
    primaryCta: {
      id: "hero-waitlist",
      label: "Powiadom mnie o starcie",
      ariaLabel: "Dołącz do listy oczekujących Plonbli",
      target: "waitlist",
      variant: "primary",
    },
    secondaryCta: {
      id: "hero-how-it-works",
      label: "Zobacz, jak to działa",
      ariaLabel: "Przejdź do sekcji wyjaśniającej działanie Plonbli",
      target: "howItWorks",
      variant: "secondary",
    },
    imageAlt: "Spokojna scena lokalnego gospodarstwa, pola i świeżych produktów",
  },
  why: {
    eyebrow: "Dlaczego powstaje Plonbli?",
    title: "To, co lokalne, nie zawsze łatwo znaleźć",
    paragraphs: [
      "Nie zawsze wiemy, skąd pochodzi jedzenie, które trafia na nasze stoły.",
      "Tymczasem kilka kilometrów od domu ktoś zbiera owoce, uprawia warzywa, pozyskuje miód, wypieka chleb albo wyrabia sery. Takie miejsca nadal bywają zaskakująco trudne do odnalezienia.",
      "Dlatego powstaje Plonbli. Chcemy ułatwić ich odkrywanie, pokazać to, co oferują, i skrócić drogę do bezpośredniej rozmowy.",
    ],
  },
  waitlist: {
    eyebrow: "Bądź blisko",
    title: "Bądź bliżej od początku",
    description: "Zostaw adres e-mail, a damy ci znać, gdy Plonbli będzie gotowe do startu.",
    benefits: [
      "wiadomość przed publicznym startem",
      "najważniejsze informacje o rozwoju Plonbli",
    ],
    form: {
      emailLabel: "Twój e-mail",
      emailPlaceholder: "twoj@email.pl",
      submitLabel: "Powiadom mnie",
      submittingLabel: "Zapisujemy…",
      privacyNote: "Napiszemy przed startem i wtedy, gdy pojawi się coś naprawdę ważnego.",
      successTitle: "Jesteś blisko od początku",
      successDescription: "Dziękujemy. Damy ci znać, gdy Plonbli będzie gotowe do startu.",
      duplicateTitle: "Ten adres już jest z nami",
      duplicateDescription: "Nie musisz zapisywać się ponownie. Damy ci znać o najważniejszych etapach.",
      errorTitle: "Nie udało się dołączyć",
      errorDescription: "Spróbuj ponownie za chwilę.",
    },
  },
  howItWorks: {
    eyebrow: "Jak to działa",
    title: "Od odkrycia do spotkania",
    description: "Trzy proste kroki prowadzą od znalezienia miejsca do bezpośredniego kontaktu.",
    steps: [
      {
        id: "find-nearby",
        number: 1,
        icon: "map-pin",
        title: "Odkryj blisko",
        description:
          "Znajdź gospodarstwa, sady, pasieki, piekarnie i serowarnie w pobliżu domu, pracy lub codziennej trasy. Dobre jedzenie może czekać zaledwie kilka kilometrów od ciebie.",
      },
      {
        id: "check-offer",
        number: 2,
        icon: "search",
        title: "Poznaj ofertę",
        description:
          "Sprawdź, co jest dostępne w danym miejscu i sezonie. Od świeżych owoców i warzyw po miód, pieczywo, sery i domowe przetwory.",
      },
      {
        id: "contact-directly",
        number: 3,
        icon: "message-circle",
        title: "Porozmawiaj u źródła",
        description:
          "Zapytaj o dostępność i szczegóły, ustal dogodny odbiór i poznaj osobę, która stoi za tym, co wybierasz.",
      },
    ],
  },
  forLocals: {
    eyebrow: "Dla ciebie",
    title: "Bliżej źródła na co dzień",
    description:
      "Odkrywaj dobre jedzenie, poznawaj nowe miejsca i dowiaduj się, od kogo pochodzą produkty trafiające na twój stół.",
    benefits: [
      {
        id: "nearby-places",
        icon: "map-pin",
        title: "Blisko ciebie",
        description: "Znajduj ciekawe miejsca przy domu, pracy i na trasach, którymi poruszasz się każdego dnia.",
      },
      {
        id: "source-information",
        icon: "badge-info",
        title: "W rytmie sezonu",
        description: "Sprawdzaj bieżącą ofertę i odkrywaj produkty wtedy, gdy przychodzi na nie najlepszy moment.",
      },
      {
        id: "direct-conversation",
        icon: "heart-handshake",
        title: "Rozmowa u źródła",
        description:
          "Pytaj o to, co jest dla ciebie ważne, i ustalaj szczegóły bezpośrednio z osobą, która zna dany produkt najlepiej.",
      },
    ],
  },
  forFarms: {
    eyebrow: "Dla tych, którzy tworzą lokalnie",
    title: "Pokaż swoje miejsce i to, co oferujesz",
    description:
      "W twojej okolicy są osoby, które szukają właśnie tego, co uprawiasz, zbierasz, wypiekasz lub przygotowujesz. Plonbli pomaga wam się odnaleźć.",
    benefits: [
      {
        id: "local-presence",
        icon: "sprout",
        title: "Widoczność w okolicy",
        description: "Pokaż swoje miejsce osobom, które naprawdę interesuje lokalna żywność.",
      },
      {
        id: "current-offer",
        icon: "leaf",
        title: "Oferta zgodna z sezonem",
        description: "Informuj o tym, co jest dostępne teraz, i aktualizuj ofertę, gdy zmienia się sezon.",
      },
      {
        id: "direct-questions",
        icon: "message-circle",
        title: "Relacje na dłużej",
        description: "Bezpośrednia rozmowa pomaga budować zaufanie i sprawia, że ludzie chętniej wracają.",
      },
    ],
    cta: {
      id: "for-farms-waitlist",
      label: "Powiadom mnie o starcie",
      ariaLabel: "Dołącz do listy oczekujących ze swoim lokalnym miejscem",
      target: "waitlist",
      variant: "secondary",
    },
  },
  faq: {
    eyebrow: "FAQ",
    title: "Warto wiedzieć",
    description: "Najważniejsze informacje o tym, jak będzie działać Plonbli.",
    items: [
      {
        id: "direct-purchase",
        question: "Czy przez Plonbli będzie można kupować?",
        answer:
          "Plonbli pomoże znaleźć lokalne miejsce, poznać jego ofertę i nawiązać bezpośredni kontakt. Szczegóły zakupu, odbioru i płatności ustalicie między sobą.",
      },
      {
        id: "who-can-join",
        question: "Kto będzie mógł dołączyć?",
        answer:
          "Osoby prowadzące gospodarstwa, sady, pasieki, piekarnie, serowarnie oraz inne lokalne miejsca związane z jedzeniem.",
      },
      {
        id: "available-products",
        question: "Jakie produkty będzie można znaleźć?",
        answer:
          "Oferta będzie zależeć od okolicy i sezonu. Mogą to być między innymi owoce, warzywa, miód, jajka, pieczywo, sery i przetwory.",
      },
      {
        id: "free-access",
        question: "Czy korzystanie z Plonbli będzie bezpłatne?",
        answer:
          "Tak. Korzystanie z Plonbli będzie bezpłatne. Chcemy, aby odkrywanie lokalnych miejsc i bezpośredni kontakt z ludźmi, którzy za nimi stoją, były dostępne dla każdego.",
      },
    ],
  },
  finalCta: {
    eyebrow: "Bądź blisko",
    title: "Zobacz, co wyrośnie blisko ciebie",
    description: "Plonbli dopiero rośnie. Zostaw adres e-mail, a damy ci znać, gdy ruszymy.",
    cta: {
      id: "final-waitlist",
      label: "Powiadom mnie o starcie",
      ariaLabel: "Przejdź do formularza i dołącz do listy oczekujących Plonbli",
      target: "waitlist",
      variant: "primary",
    },
  },
  footer: {
    description: "Plonbli pomaga odkrywać lokalne jedzenie i ludzi, którzy za nim stoją.",
    navigationLabel: "Na tej stronie",
    socialLabel: "Znajdź nas",
    waitlistLabel: "Powiadom mnie o starcie",
  },
} as const satisfies LandingContent;
