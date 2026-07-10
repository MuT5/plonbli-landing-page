import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";

import { getStoryScene, type StorySceneId } from "@/content/storyScenes";

type SelectScene = (scene: StorySceneId) => void;

const AmbientStoryContext = createContext<SelectScene | null>(null);

interface AmbientStorySequenceProps {
  children: ReactNode;
}

export function AmbientStorySequence({ children }: AmbientStorySequenceProps) {
  const reducedMotion = Boolean(useReducedMotion());
  const [requestedScene, setRequestedScene] = useState<StorySceneId>("contact");
  const [visibleScene, setVisibleScene] = useState<StorySceneId>("contact");
  const scene = getStoryScene(visibleScene);

  useEffect(() => {
    if (requestedScene === visibleScene) return undefined;

    const nextScene = getStoryScene(requestedScene);
    const source = window.matchMedia("(min-width: 1024px)").matches
      ? nextScene.desktopSrc
      : nextScene.mobileSrc;
    const preloader = new Image();
    let cancelled = false;
    let revealed = false;

    const reveal = () => {
      if (cancelled || revealed) return;
      revealed = true;
      setVisibleScene(requestedScene);
    };

    preloader.onload = reveal;
    preloader.onerror = () => {
      if (!cancelled) setRequestedScene(visibleScene);
    };
    preloader.src = `${import.meta.env.BASE_URL}${source}`;

    if (typeof preloader.decode === "function") {
      void preloader.decode().then(reveal, () => undefined);
    }

    return () => {
      cancelled = true;
      preloader.onload = null;
      preloader.onerror = null;
    };
  }, [requestedScene, visibleScene]);

  return (
    <AmbientStoryContext.Provider value={setRequestedScene}>
      <div
        className="ambient-story-sequence"
        data-ambient-story-active={visibleScene}
        data-testid="ambient-story-sequence"
      >
        <div className="ambient-story-stage" aria-hidden="true">
          <div className="ambient-story-frame">
            <AnimatePresence initial={false} mode="sync">
              <motion.picture
                key={scene.id}
                className="ambient-story-scene"
                data-ambient-story-scene={scene.id}
                initial={reducedMotion ? false : { opacity: 0, scale: 1.028 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reducedMotion ? undefined : { opacity: 0, scale: 0.992 }}
                transition={{
                  duration: reducedMotion ? 0 : 1.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <source
                  media="(min-width: 1024px)"
                  srcSet={`${import.meta.env.BASE_URL}${scene.desktopSrc}`}
                />
                <img
                  src={`${import.meta.env.BASE_URL}${scene.mobileSrc}`}
                  alt=""
                  width="800"
                  height="1000"
                  loading={visibleScene === "contact" ? "eager" : "lazy"}
                  {...{ fetchpriority: "low" }}
                  decoding="async"
                />
              </motion.picture>
            </AnimatePresence>
            <div className="ambient-story-image-tone" />
          </div>
          <div className="ambient-story-veil" />
        </div>

        <div className="ambient-story-content">{children}</div>
      </div>
    </AmbientStoryContext.Provider>
  );
}

interface AmbientStoryChapterProps {
  children: ReactNode;
  scene: StorySceneId;
}

export function AmbientStoryChapter({ children, scene }: AmbientStoryChapterProps) {
  const chapterRef = useRef<HTMLDivElement>(null);
  const selectScene = useContext(AmbientStoryContext);
  const isCentered = useInView(chapterRef, {
    margin: "-42% 0px -42% 0px",
  });

  useEffect(() => {
    if (isCentered) selectScene?.(scene);
  }, [isCentered, scene, selectScene]);

  return (
    <div ref={chapterRef} className="ambient-story-chapter" data-ambient-story-chapter={scene}>
      {children}
    </div>
  );
}
