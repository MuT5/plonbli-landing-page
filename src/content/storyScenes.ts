import { launchCategory, type LaunchCategory, type SceneArtwork } from "@/content/launchCategory";

export type StorySceneId = keyof typeof launchCategory.storyImages;

const sequence = ["discovery", "offer", "contact"] as const satisfies readonly StorySceneId[];

export interface StoryScene extends SceneArtwork {
  readonly id: StorySceneId;
  readonly label: string;
}

export function createStoryScenes(category: LaunchCategory): StoryScene[] {
  return sequence.map((id) => {
    const { stepArtwork, ...artwork } = category.storyImages[id];
    return { id, ...artwork, ...stepArtwork };
  });
}

export const storyScenes = createStoryScenes(launchCategory);

export function getAmbientStoryScene(id: StorySceneId): StoryScene {
  const { desktopSrc, mobileSrc, label, alt } = launchCategory.storyImages[id];
  return { id, desktopSrc, mobileSrc, label, alt };
}
