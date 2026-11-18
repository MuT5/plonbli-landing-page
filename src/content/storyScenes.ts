import { launchCategory, type LaunchCategory } from "@/content/launchCategory";

export type StorySceneId = keyof typeof launchCategory.storyImages;

const sequence = ["discovery", "offer", "contact"] as const satisfies readonly StorySceneId[];

export function createStoryScenes(category: LaunchCategory) {
  return sequence.map((id) => ({ id, ...category.storyImages[id] }));
}

export const storyScenes = createStoryScenes(launchCategory);
export type StoryScene = (typeof storyScenes)[number];

export function getStoryScene(id: StorySceneId): StoryScene {
  return { id, ...launchCategory.storyImages[id] };
}
