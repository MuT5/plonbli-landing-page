import type { LandingContent } from "@/types/landing";

export const landingContent = {
  seo: {
    title: "Plonbli — lokalne produkty bliżej Ciebie",
    description:
      "Plonbli powstaje, aby ułatwić odkrywanie lokalnych gospodarstw, sprawdzanie ich ofert i bezpośredni kontakt. Dołącz do listy oczekujących.",
    openGraphTitle: "Plonbli — lokalne produkty bliżej Ciebie",
    openGraphDescription:
      "Odkrywaj lokalne gospodarstwa, sprawdzaj ich oferty i pytaj bezpośrednio o szczegóły. Zapisz się na listę oczekujących Plonbli.",
    openGraphImageAlt: "Plonbli — lokalne gospodarstwa i żywność blisko Ciebie",
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
      label: "Dołącz do listy",
      ariaLabel: "Przejdź do formularza listy oczekujących",
      target: "waitlist",
      variant: "primary",
    },
  },
  hero: {
    eyebrow: "Plonbli powstaje • zapisz się na start",
    title: "Lokalne produkty bliżej Ciebie",
    description:
      "Budujemy miejsce, w którym łatwiej znajdziesz gospodarstwa i lokalne pracownie w swojej okolicy, sprawdzisz ich ofertę i zapytasz bezpośrednio o szczegóły.",
    primaryCta: {
      id: "hero-waitlist",
      label: "Dołącz do listy oczekujących",
      ariaLabel: "Dołącz do listy oczekujących Plonbli",
      target: "waitlist",
      variant: "primary",
    },
    secondaryCta: {
      id: "hero-how-it-works",
      label: "Zobacz, jak to będzie działać",
      ariaLabel: "Przejdź do sekcji wyjaśniającej działanie Plonbli",
      target: "howItWorks",
      variant: "secondary",
    },
    note:
      "Plonbli nie jest sklepem i nie obsługuje płatności. Odbiór i rozliczenie ustalisz bezpośrednio z gospodarstwem lub lokalną pracownią.",
    imageAlt: "Spokojna scena lokalnego gospodarstwa, pola i świeżych produktów",
  },
  waitlist: {
    eyebrow: "Lista oczekujących",
    title: "Otrzymaj wiadomość, gdy Plonbli będzie gotowe",
    description:
      "Zostaw adres e-mail, a poinformujemy Cię o starcie i najważniejszych etapach rozwoju. Bez zbędnych wiadomości.",
    benefits: [
      "informacja o uruchomieniu Plonbli",
      "najważniejsze aktualizacje przed startem",
      "możliwość rezygnacji w każdej chwili",
    ],
    form: {
      emailLabel: "Adres e-mail",
      emailPlaceholder: "twoj@email.pl",
      submitLabel: "Zapisz mnie na listę",
      submittingLabel: "Zapisujemy…",
      privacyNote:
        "Użyjemy Twojego adresu wyłącznie do wiadomości związanych ze startem i rozwojem Plonbli. Aby zrezygnować, napisz na privacy@plonbli.pl.",
      successTitle: "Jesteś na liście!",
      successDescription: "Dziękujemy. Damy Ci znać, gdy pojawią się ważne informacje o starcie Plonbli.",
      duplicateTitle: "Ten adres jest już na liście",
      duplicateDescription: "Nie musisz zapisywać się ponownie. Powiadomimy Cię o ważnych aktualizacjach.",
      errorTitle: "Nie udało się zapisać adresu",
      errorDescription: "Spróbuj ponownie za chwilę. Jeśli problem się powtórzy, napisz do nas.",
    },
  },
  howItWorks: {
    eyebrow: "Jak to będzie działać",
    title: "Od odkrycia do kontaktu — w trzech prostych krokach",
    description:
      "Znajdź miejsce w swojej okolicy, sprawdź aktualną ofertę i ustal szczegóły bezpośrednio — Plonbli pomaga połączyć te trzy etapy.",
    steps: [
      {
        id: "find-nearby",
        number: 1,
        icon: "map-pin",
        title: "Znajdź lokalnie",
        description: "Odkryj gospodarstwa, pasieki, sady i lokalne pracownie w swojej okolicy.",
      },
      {
        id: "check-offer",
        number: 2,
        icon: "search",
        title: "Sprawdź ofertę",
        description: "Zobacz, co oferują wybrane miejsca i co jest aktualnie dostępne.",
      },
      {
        id: "contact-directly",
        number: 3,
        icon: "message-circle",
        title: "Zapytaj i umów się bezpośrednio",
        description:
          "Zapytaj o produkt, cenę lub termin. Odbiór i rozliczenie ustal bezpośrednio z gospodarstwem lub pracownią.",
      },
    ],
    note: "Plonbli pomaga rozpocząć kontakt. Nie przejmuje płatności ani ustaleń dotyczących odbioru.",
  },
  forLocals: {
    eyebrow: "Dla szukających lokalnie",
    title: "Poznaj ludzi i miejsca, od których pochodzi jedzenie",
    description:
      "Zamiast szukać informacji w wielu miejscach, odkrywaj lokalne gospodarstwa i pracownie w jednej, czytelnej przestrzeni.",
    benefits: [
      {
        id: "nearby-places",
        icon: "map-pin",
        title: "Miejsca z Twojej okolicy",
        description: "Sprawdzaj, co znajduje się blisko domu, pracy lub miejsca, które właśnie odwiedzasz.",
      },
      {
        id: "source-information",
        icon: "badge-info",
        title: "Więcej informacji u źródła",
        description: "Poznaj ofertę, dostępność i sposób działania opisany przez konkretne gospodarstwo lub pracownię.",
      },
      {
        id: "direct-conversation",
        icon: "heart-handshake",
        title: "Bezpośrednia rozmowa",
        description: "Zapytaj o szczegóły bezpośrednio, a termin i sposób odbioru ustal po swojemu.",
      },
    ],
  },
  forFarms: {
    eyebrow: "Dla gospodarstw i lokalnych pracowni",
    title: "Daj się znaleźć w swojej okolicy",
    description:
      "Plonbli powstaje także z myślą o rolnikach, sadownikach, pszczelarzach, serowarniach, piekarniach i innych miejscach związanych z lokalną żywnością.",
    benefits: [
      {
        id: "local-presence",
        icon: "sprout",
        title: "Czytelna lokalna obecność",
        description: "Pokaż, gdzie działasz, czym się zajmujesz i jak najlepiej się z Tobą skontaktować.",
      },
      {
        id: "current-offer",
        icon: "leaf",
        title: "Miejsce na aktualną ofertę",
        description: "Przedstaw produkty, sezonowość i dostępność w formie łatwej do sprawdzenia.",
      },
      {
        id: "direct-questions",
        icon: "message-circle",
        title: "Pytania bezpośrednio do Ciebie",
        description: "Odpowiadaj na pytania i ustalaj szczegóły bez narzuconego procesu płatności.",
      },
    ],
    cta: {
      id: "for-farms-waitlist",
      label: "Zgłoś zainteresowanie",
      ariaLabel: "Dołącz do listy oczekujących jako gospodarstwo lub lokalna pracownia",
      target: "waitlist",
      variant: "secondary",
    },
    note: "Zapis na listę nie zobowiązuje do założenia konta ani publikacji oferty.",
  },
  trust: {
    eyebrow: "Jasne zasady",
    title: "Bezpośredni kontakt, jasne zasady",
    description:
      "Plonbli ma udostępniać profile, oferty i narzędzia kontaktu. Odbiór i rozliczenie pozostają po stronie osób, które ze sobą rozmawiają.",
    points: [
      "dostępność i cena są potwierdzane bezpośrednio",
      "odbiór oraz rozliczenie ustalacie bezpośrednio",
      "informacje w profilach i ofertach pochodzą od gospodarstw i pracowni, które je publikują",
    ],
  },
  faq: {
    eyebrow: "Najczęstsze pytania",
    title: "Zanim dołączysz do listy",
    description: "Krótko wyjaśniamy, czym będzie Plonbli i co oznacza zapis na listę oczekujących.",
    items: [
      {
        id: "launch-date",
        question: "Kiedy Plonbli wystartuje?",
        answer:
          "Pracujemy nad pierwszą publiczną wersją i nie podajemy daty, której nie możemy odpowiedzialnie potwierdzić. Osoby na liście oczekujących otrzymają wiadomość, gdy będziemy gotowi podzielić się konkretnym terminem.",
      },
      {
        id: "waitlist-benefit",
        question: "Co otrzymam po zapisaniu się na listę?",
        answer:
          "Wyślemy Ci najważniejsze informacje o starcie i istotnych etapach rozwoju. Nie będziemy wysyłać codziennych wiadomości ani przekazywać adresu do celów reklamowych innych firm.",
      },
      {
        id: "not-a-store",
        question: "Czy Plonbli jest sklepem?",
        answer:
          "Nie. Plonbli ma pomagać znaleźć lokalne gospodarstwa i pracownie, sprawdzić ich ofertę oraz rozpocząć bezpośrednią rozmowę. Nie pośredniczymy w ustaleniach i nie obsługujemy płatności.",
      },
      {
        id: "pickup-and-payment",
        question: "Jak będą ustalane odbiór i rozliczenie?",
        answer:
          "Termin, miejsce odbioru, cenę i sposób rozliczenia ustalisz bezpośrednio z gospodarstwem lub lokalną pracownią, poza Plonbli.",
      },
      {
        id: "farm-interest",
        question: "Czy mogę zapisać się, jeśli prowadzę gospodarstwo lub lokalną pracownię?",
        answer:
          "Tak. Lista jest otwarta zarówno dla osób szukających lokalnej żywności, jak i dla miejsc, które chcą dać się znaleźć w swojej okolicy.",
      },
      {
        id: "unsubscribe",
        question: "Czy mogę zrezygnować z listy?",
        answer:
          "Tak. Napisz na privacy@plonbli.pl, a usuniemy Twój adres z listy. Zapis nie wiąże się z żadnym zobowiązaniem.",
      },
    ],
  },
  finalCta: {
    eyebrow: "Bądź blisko od początku",
    title: "Dołącz do osób, które czekają na Plonbli",
    description:
      "Zapisz się, aby otrzymać wiadomość o starcie i zobaczyć, jak rozwija się miejsce tworzone wokół lokalnej żywności i bezpośrednich relacji.",
    cta: {
      id: "final-waitlist",
      label: "Powiadom mnie o starcie",
      ariaLabel: "Przejdź do formularza i dołącz do listy oczekujących Plonbli",
      target: "waitlist",
      variant: "primary",
    },
    note: "Bez zbędnych wiadomości. Rezygnacja jest możliwa w każdej chwili.",
  },
  footer: {
    description:
      "Plonbli powstaje, aby ułatwić odkrywanie lokalnych gospodarstw i bezpośredni kontakt z ludźmi, od których pochodzi żywność.",
    navigationLabel: "Na tej stronie",
    socialLabel: "Plonbli w mediach społecznościowych",
    contactLabel: "Kontakt",
    privacyLabel: "Prywatność i rezygnacja",
    waitlistLabel: "Powiadom mnie o starcie",
    disclaimer:
      "Plonbli nie jest sklepem i nie obsługuje płatności. Szczegóły odbioru i rozliczenia ustalasz bezpośrednio z gospodarstwem lub lokalną pracownią.",
  },
} as const satisfies LandingContent;
