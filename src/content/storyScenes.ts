export type StorySceneId = "discovery" | "offer" | "contact";

export interface StoryScene {
  id: StorySceneId;
  desktopSrc: string;
  mobileSrc: string;
  label: string;
  input: number[];
  output: number[];
}

export const storyScenes: readonly StoryScene[] = [
  {
    id: "discovery",
    desktopSrc: "landing/story-01-discovery.webp",
    mobileSrc: "landing/story-01-discovery-mobile.webp",
    label: "Odkrycie miejsca",
    input: [0, 0.31, 0.47],
    output: [1, 1, 0],
  },
  {
    id: "offer",
    desktopSrc: "landing/story-02-offer.webp",
    mobileSrc: "landing/story-02-offer-mobile.webp",
    label: "Poznanie oferty",
    input: [0.31, 0.47, 0.59, 0.75],
    output: [0, 1, 1, 0],
  },
  {
    id: "contact",
    desktopSrc: "landing/story-03-contact.webp",
    mobileSrc: "landing/story-03-contact-mobile.webp",
    label: "Bezpośrednie spotkanie",
    input: [0.59, 0.75, 1],
    output: [0, 1, 1],
  },
];

export function getStoryScene(id: StorySceneId) {
  const scene = storyScenes.find((item) => item.id === id);

  if (!scene) {
    throw new Error(`Unknown story scene: ${id}`);
  }

  return scene;
}
