export type StoryStage = "discovery" | "offer" | "contact";

export interface SceneImage {
  readonly desktopSrc: string;
  readonly mobileSrc: string;
  readonly label: string;
  readonly alt: string;
}

/** The current edition of the atlas. Layout, navigation and contact steps stay the same across editions. */
export interface LaunchCategory {
  readonly hero: { readonly lead: string; readonly asset: string; readonly caption: string; readonly alt: string };
  readonly why: readonly string[];
  readonly storyImages: Readonly<Record<StoryStage, SceneImage>>;
  readonly whoCanJoin: string;
  readonly availableOffer: string;
  readonly searchDescription: string;
}

export const launchCategory: LaunchCategory = {
  hero: {
    lead: "Zaczynamy od lokalnego jedzenia. Na mapie Od\u00a0Swoich znajdziesz miejsca, gdzie kupisz warzywa, owoce czy miód prosto u źródła.",
    asset: "landing/atlas-garden-morning",
    caption: "Przy zbiorze marchwi",
    alt: "Akwarela: trzy osoby zbierają marchew na grządkach. Za nimi widać dom, ceglaną stodołę i tunel foliowy.",
  },
  why: [
    "Co rano mijasz ten sam zjazd z głównej drogi. Któregoś dnia sąsiadka przynosi z tamtego gospodarstwa świeże rzodkiewki. Dopiero wtedy dowiadujesz się, że tuż za zakrętem ktoś uprawia warzywa.",
    "Od\u00a0Swoich powstaje po to, żeby takie miejsca łatwiej było znaleźć. Jeszcze przed wyjazdem sprawdzisz ofertę i zapytasz o odbiór.",
  ],
  storyImages: {
    discovery: {
      desktopSrc: "landing/atlas-garden-entry-960.webp", mobileSrc: "landing/atlas-garden-entry-640.webp",
      label: "Blisko ciebie", alt: "Otwarta drewniana brama pod jabłonią. Za nią polna droga prowadzi między grządkami na podwórze.",
    },
    offer: {
      desktopSrc: "landing/atlas-garden-harvest-960.webp", mobileSrc: "landing/atlas-garden-harvest-640.webp",
      label: "Prosto z grządki", alt: "Dłonie układają pęczek marchwi w drewnianej skrzynce obok buraków i kalarepy.",
    },
    contact: {
      desktopSrc: "landing/atlas-garden-meeting-960.webp", mobileSrc: "landing/atlas-garden-meeting-640.webp",
      label: "Rozmowa przy odbiorze", alt: "Gospodyni rozmawia z sąsiadem przy stole. Między nimi stoi skrzynka ze świeżą marchwią.",
    },
  },
  whoCanJoin: "Na początek zapraszamy osoby prowadzące gospodarstwa, sady, pasieki, piekarnie i serowarnie oraz wszystkich, którzy chcą odkrywać takie miejsca.",
  availableOffer: "To zależy od miejsca i sezonu. W gospodarstwie mogą to być młoda marchew, kalarepa i rzodkiewki, w sadzie owoce, a w pasiece miód.",
  searchDescription: "Znajdź na mapie Od Swoich gospodarstwa, sady i pasieki w okolicy. Sprawdź sezonową ofertę i umów odbiór prosto u źródła.",
};
