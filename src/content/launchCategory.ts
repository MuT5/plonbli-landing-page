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
    lead: "Zaczynamy od lokalnego jedzenia. Pomożemy ci znaleźć gospodarstwo w okolicy i zapytać, czy można już przyjechać po młodą marchew albo pęczek rzodkiewek.",
    asset: "landing/atlas-garden-morning",
    caption: "Przy zbiorze marchwi",
    alt: "Akwarela: trzy osoby zbierają marchew na grządkach. Za nimi widać dom, ceglaną stodołę i tunel foliowy.",
  },
  why: [
    "Co rano mijasz ten sam zjazd z głównej drogi. Dopiero kiedy sąsiadka przynosi stamtąd pęczek rzodkiewek, dowiadujesz się, że tuż za zakrętem ktoś uprawia warzywa.",
    "Z aplikacją Od\u00a0Swoich łatwiej znajdziesz takie miejsce i jeszcze przed wyjazdem zapytasz, po co warto przyjechać.",
  ],
  storyImages: {
    discovery: {
      desktopSrc: "landing/atlas-garden-entry-960.webp", mobileSrc: "landing/atlas-garden-entry-640.webp",
      label: "Droga do gospodarstwa", alt: "Otwarta drewniana brama pod jabłonią. Za nią polna droga prowadzi między grządkami na podwórze.",
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
  searchDescription: "Poznaj Od Swoich, atlas lokalnych miejsc. Pomoże ci znaleźć gospodarstwa w okolicy, sprawdzić, co jest w sezonie, i porozmawiać z ludźmi, którzy uprawiają warzywa.",
};
