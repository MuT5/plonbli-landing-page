import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";

import { getStoryScene, type StorySceneId } from "@/content/storyScenes";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type SelectScene = (scene: StorySceneId) => void;

const AmbientStoryContext = createContext<SelectScene | null>(null);

interface AmbientStorySequenceProps {
  children: ReactNode;
  initialScene?: StorySceneId;
}

export function AmbientStorySequence({ children, initialScene = "contact" }: AmbientStorySequenceProps) {
  const reducedMotion = useReducedMotion();
  const [requestedScene, setRequestedScene] = useState(initialScene);
  const [visibleScene, setVisibleScene] = useState(initialScene);
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
    let revealFrame: number | null = null;

    const reveal = () => {
      if (cancelled || revealed) return;
      revealed = true;
      revealFrame = window.requestAnimationFrame(() => {
        if (!cancelled) setVisibleScene(requestedScene);
      });
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
      if (revealFrame !== null) window.cancelAnimationFrame(revealFrame);
      preloader.onload = null;
      preloader.onerror = null;
    };
  }, [requestedScene, visibleScene]);

  return (
    <AmbientStoryContext.Provider value={setRequestedScene}>
      <div
        className="ambient-story-sequence"
        data-ambient-story-active={visibleScene}
        data-ambient-story-motion={reducedMotion ? "crossfade-only" : "full"}
        data-testid="ambient-story-sequence"
      >
        <div className="ambient-story-stage" aria-hidden="true">
          <div className="ambient-story-frame">
            <AnimatePresence initial={false} mode="sync">
              <motion.picture
                key={scene.id}
                className="ambient-story-scene"
                data-ambient-story-scene={scene.id}
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.018 }}
                animate={reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.994 }}
                transition={
                  reducedMotion
                    ? {
                        opacity: {
                          duration: 0.16,
                          ease: [0.45, 0, 0.55, 1],
                        },
                      }
                    : {
                        opacity: {
                          duration: 1.45,
                          ease: [0.45, 0, 0.55, 1],
                        },
                        scale: {
                          duration: 1.9,
                          ease: [0.16, 1, 0.3, 1],
                        },
                      }
                }
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
                  loading="lazy"
                  {...{ fetchpriority: "low" }}
                  decoding="async"
                />
              </motion.picture>
            </AnimatePresence>
          </div>
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
