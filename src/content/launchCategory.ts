export type StoryStage = "discovery" | "offer" | "contact";

export interface SceneArtwork {
  readonly desktopSrc: string;
  readonly mobileSrc: string;
  readonly alt: string;
}

export interface SceneImage extends SceneArtwork {
  readonly label: string;
  readonly stepArtwork?: SceneArtwork;
}

/** The current edition of the atlas. Layout, navigation and contact steps stay the same across editions. */
export interface LaunchCategory {
  readonly hero: { readonly lead: string; readonly asset: string; readonly alt: string };
  readonly why: readonly string[];
  readonly storyImages: Readonly<Record<StoryStage, SceneImage>>;
  readonly whoCanJoin: string;
  readonly availableOffer: string;
  readonly searchTitle: string;
  readonly searchDescription: string;
}

export const launchCategory: LaunchCategory = {
  hero: {
    lead: "Tworzymy mapę lokalnych gospodarstw. W aplikacji Od\u00a0Swoich sprawdzisz, gdzie kupić warzywa prosto od rolnika, owoce z sadu czy miód z pasieki.",
    asset: "landing/atlas-garden-morning",
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
      stepArtwork: {
        desktopSrc: "landing/atlas-garden-entry-phone-960.webp", mobileSrc: "landing/atlas-garden-entry-phone-640.webp",
        alt: "Telefon pokazuje mapę Od Swoich z pinezką na gospodarstwie. Za nim widać to samo podwórze z drewnianą bramą i ceglaną stodołą.",
      },
    },
    offer: {
      desktopSrc: "landing/atlas-garden-harvest-960.webp", mobileSrc: "landing/atlas-garden-harvest-640.webp",
      label: "Prosto z grządki", alt: "Dłonie układają pęczek marchwi w drewnianej skrzynce obok buraków i kalarepy.",
    },
    contact: {
      desktopSrc: "landing/atlas-garden-meeting-960.webp", mobileSrc: "landing/atlas-garden-meeting-640.webp",
      label: "Kontakt przed odbiorem", alt: "Gospodyni rozmawia z sąsiadem przy stole. Między nimi stoi skrzynka ze świeżą marchwią.",
    },
  },
  whoCanJoin: "Swoje miejsce będą mogły zgłosić osoby prowadzące gospodarstwa, sady, pasieki, piekarnie i serowarnie. Zgłoszenia nie są jeszcze otwarte. Sposób dołączenia podamy na tej stronie.",
  availableOffer: "Na mapie pokażemy lokalne produkty spożywcze dostępne u źródła. Zależnie od sezonu mogą to być marchew, kalarepa i rzodkiewki z gospodarstwa, owoce prosto z sadu czy miód z pasieki.",
  searchTitle: "Mapa lokalnych gospodarstw i produktów",
  searchDescription: "Od Swoich to powstająca mapa lokalnych gospodarstw. Sprawdzisz, gdzie kupić warzywa prosto od rolnika i inne lokalne produkty spożywcze.",
};
