import type { LandingContent } from "@/types/landing";

export const landingContent = {
  seo: {
    title: "Plonbli. Dobre rzeczy rosną blisko",
    description:
      "Odkrywaj gospodarstwa, pasieki, sady i lokalne piekarnie w swojej okolicy. Poznawaj ich ofertę i pytaj u źródła. Dołącz do listy Plonbli.",
    openGraphTitle: "Plonbli. Dobre rzeczy rosną blisko",
    openGraphDescription:
      "Odkrywaj miejsca, ludzi i jedzenie z Twojej okolicy. Poznaj Plonbli od pierwszego dnia.",
    openGraphImageAlt: "Plonbli, lokalne jedzenie i miejsca blisko Ciebie",
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
      { label: "Dla gospodarstw", target: "forFarms" },
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
    eyebrow: "Plonbli • blisko od początku",
    title: "Dobre rzeczy rosną blisko",
    description:
      "Odkrywaj gospodarstwa, pasieki, sady i lokalne piekarnie w swojej okolicy. Poznawaj ich ofertę i pytaj u źródła.",
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
  waitlist: {
    eyebrow: "Lista oczekujących",
    title: "Poznaj Plonbli od pierwszego dnia",
    description: "Zostaw e-mail. Napiszemy przed startem i wtedy, gdy pojawi się ważna aktualizacja.",
    benefits: [
      "wiadomość przed publicznym startem",
      "wybrane aktualizacje, bez szumu",
    ],
    form: {
      emailLabel: "Twój e-mail",
      emailPlaceholder: "twoj@email.pl",
      submitLabel: "Powiadom mnie",
      submittingLabel: "Zapisujemy…",
      privacyNote:
        "Adres wykorzystamy wyłącznie do najważniejszych wiadomości o Plonbli.",
      successTitle: "Jesteś blisko od początku",
      successDescription: "Dziękujemy. Odezwemy się, gdy Plonbli będzie gotowe na kolejny krok.",
      duplicateTitle: "Ten adres już jest z nami",
      duplicateDescription: "Nie musisz zapisywać się ponownie. Damy Ci znać o najważniejszych etapach.",
      errorTitle: "Nie udało się dołączyć",
      errorDescription: "Spróbuj ponownie za chwilę.",
    },
  },
  howItWorks: {
    eyebrow: "Jak to działa",
    title: "Od odkrycia do spotkania",
    description: "Trzy chwile, które przybliżają to, co lokalne.",
    steps: [
      {
        id: "find-nearby",
        number: 1,
        icon: "map-pin",
        title: "Odkryj blisko",
        description: "Znajdź gospodarstwa, sady, pasieki i lokalne piekarnie w wybranej okolicy.",
      },
      {
        id: "check-offer",
        number: 2,
        icon: "search",
        title: "Poznaj ofertę",
        description: "Zobacz produkty, sezonowość i aktualną dostępność.",
      },
      {
        id: "contact-directly",
        number: 3,
        icon: "message-circle",
        title: "Porozmawiaj u źródła",
        description: "Zapytaj o szczegóły i umów dogodny odbiór.",
      },
    ],
  },
  forLocals: {
    eyebrow: "Dla Ciebie",
    title: "Bliżej źródła. Bliżej ludzi.",
    description: "Poznawaj miejsca i ludzi stojących za jedzeniem z Twojej okolicy.",
    benefits: [
      {
        id: "nearby-places",
        icon: "map-pin",
        title: "Blisko Ciebie",
        description: "Odkrywaj miejsca przy domu, pracy i na codziennych trasach.",
      },
      {
        id: "source-information",
        icon: "badge-info",
        title: "W rytmie sezonu",
        description: "Poznawaj produkty i ich aktualną dostępność.",
      },
      {
        id: "direct-conversation",
        icon: "heart-handshake",
        title: "Rozmowa u źródła",
        description: "Pytaj bezpośrednio i ustalaj szczegóły po swojemu.",
      },
    ],
  },
  forFarms: {
    eyebrow: "Dla gospodarstw",
    title: "Pokaż, co rośnie i powstaje u Ciebie",
    description: "Zaprezentuj swoje miejsce, sezonową ofertę i prosty sposób kontaktu.",
    benefits: [
      {
        id: "local-presence",
        icon: "sprout",
        title: "Widoczność w okolicy",
        description: "Daj się znaleźć osobom, które szukają lokalnie.",
      },
      {
        id: "current-offer",
        icon: "leaf",
        title: "Oferta we właściwym czasie",
        description: "Pokazuj to, co jest dostępne teraz i w danym sezonie.",
      },
      {
        id: "direct-questions",
        icon: "message-circle",
        title: "Relacje zaczynają się od rozmowy",
        description: "Odpowiadaj na pytania i buduj grono stałych odbiorców.",
      },
    ],
    cta: {
      id: "for-farms-waitlist",
      label: "Powiadom mnie o starcie",
      ariaLabel: "Dołącz do listy oczekujących jako gospodarstwo",
      target: "waitlist",
      variant: "secondary",
    },
  },
  faq: {
    eyebrow: "FAQ",
    title: "Warto wiedzieć",
    description: "Krótko o starcie Plonbli.",
    items: [
      {
        id: "launch-date",
        question: "Kiedy Plonbli wystartuje?",
        answer: "Pracujemy nad pierwszą odsłoną. Osoby z listy poznają termin jako pierwsze.",
      },
      {
        id: "waitlist-benefit",
        question: "Co otrzymam po zapisie?",
        answer: "Wiadomość o starcie i wybrane aktualizacje. Tylko to, co naprawdę istotne.",
      },
      {
        id: "farm-interest",
        question: "Dla kogo powstaje Plonbli?",
        answer:
          "Dla osób szukających lokalnych produktów oraz gospodarstw, sadów, pasiek i piekarni, które chcą być łatwiej odnajdywane.",
      },
    ],
  },
  finalCta: {
    eyebrow: "Bądź blisko",
    title: "Zobacz, co wyrośnie blisko Ciebie",
    description: "Dołącz do listy i poznaj Plonbli od pierwszego dnia.",
    cta: {
      id: "final-waitlist",
      label: "Powiadom mnie o starcie",
      ariaLabel: "Przejdź do formularza i dołącz do listy oczekujących Plonbli",
      target: "waitlist",
      variant: "primary",
    },
  },
  footer: {
    description: "Plonbli przybliża lokalne jedzenie i ludzi, którzy je tworzą.",
    navigationLabel: "Na tej stronie",
    socialLabel: "Znajdź nas",
    waitlistLabel: "Powiadom mnie o starcie",
  },
} as const satisfies LandingContent;
