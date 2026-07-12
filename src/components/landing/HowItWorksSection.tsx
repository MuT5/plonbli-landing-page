import { type RefObject, useRef } from "react";
import { motion, type MotionStyle, type MotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

import HarvestGrowth from "@/components/landing/HarvestGrowth";
import LandingIcon from "@/components/landing/LandingIcon";
import Reveal from "@/components/landing/Reveal";
import { landingContent } from "@/content/landing.pl";
import { storyScenes, type StoryScene } from "@/content/storyScenes";
import { useIsMobile } from "@/hooks/use-mobile";

interface StoryboardSceneProps {
  index: number;
  isMobile: boolean;
  mobileOpacity: MotionValue<number>;
  progress: MotionValue<number>;
  reducedMotion: boolean;
  scene: StoryScene;
}

type StoryboardSceneMotionStyle = MotionStyle & {
  "--story-scene-desktop-opacity": MotionValue<number>;
  "--story-scene-mobile-opacity": MotionValue<number>;
};

function StoryboardScene({ index, isMobile, mobileOpacity, progress, reducedMotion, scene }: StoryboardSceneProps) {
  const desktopOpacity = useTransform(progress, scene.input, scene.output);
  const scale = useTransform(progress, [0, 1], [1.025, 1]);
  const sceneStyle: StoryboardSceneMotionStyle = {
    "--story-scene-desktop-opacity": desktopOpacity,
    "--story-scene-mobile-opacity": mobileOpacity,
    ...(reducedMotion || isMobile ? {} : { scale }),
  };

  return (
    <motion.figure
      className="story-visual-scene"
      data-storyboard-scene={scene.id}
      data-storyboard-step={index + 1}
      data-mobile-scene-sync="card-entry"
      style={sceneStyle}
    >
      <picture>
        <source
          media="(min-width: 640px)"
          srcSet={`${import.meta.env.BASE_URL}${scene.desktopSrc}`}
        />
        <img
          src={`${import.meta.env.BASE_URL}${scene.mobileSrc}`}
          alt=""
          width="800"
          height="1000"
          loading="lazy"
          decoding="async"
        />
      </picture>
    </motion.figure>
  );
}

interface StoryChapterProps {
  chapterRef: RefObject<HTMLDivElement>;
  index: number;
  isMobile: boolean;
  reducedMotion: boolean;
  scene: StoryScene;
  step: (typeof landingContent.howItWorks.steps)[number];
}

type StoryChapterMotionStyle = MotionStyle & {
  "--story-chapter-opacity": MotionValue<number>;
};

function StoryChapter({ chapterRef, index, isMobile, reducedMotion, scene, step }: StoryChapterProps) {
  const { scrollYProgress: imageOverlapProgress } = useScroll({
    target: chapterRef,
    offset: ["start 51%", "end 14%"],
  });
  const smoothImageOverlap = useSpring(imageOverlapProgress, {
    stiffness: 160,
    damping: 32,
    mass: 0.28,
  });
  const opacity = useTransform(smoothImageOverlap, [0, 0.72, 1], [1, 0.14, 0.06]);
  const scrollFadeStyle: StoryChapterMotionStyle = { "--story-chapter-opacity": opacity };
  const revealOnEntry = !isMobile && !reducedMotion;

  return (
    <motion.article
      className="harvest-chapter story-chapter"
      data-mobile-scroll-fade="image-overlap"
      data-story-step={index + 1}
      initial={revealOnEntry ? { opacity: 0.36, y: 18 } : false}
      whileInView={revealOnEntry ? { opacity: 1, y: 0 } : undefined}
      viewport={revealOnEntry ? { once: true, amount: 0.2 } : undefined}
      transition={{ duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div ref={chapterRef} className="story-chapter-copy" data-story-card={index + 1} style={scrollFadeStyle}>
        <div className="story-chapter-meta">
          <span className="story-chapter-icon">
            <LandingIcon name={step.icon} className="size-5" />
          </span>
          <span className="story-chapter-number">0{step.number}</span>
          <span className="story-chapter-label">{scene.label}</span>
        </div>
        <h3 className="mt-6 font-display text-[clamp(2.25rem,4vw,3.4rem)] font-bold leading-[1.02] text-[var(--color-olive)]">
          {step.title}
        </h3>
        <p className="mt-4 max-w-xl text-lg leading-8 text-[var(--color-ink-muted)]">
          {step.description}
        </p>
      </motion.div>
    </motion.article>
  );
}

export default function HowItWorksSection() {
  const stepsRef = useRef<HTMLDivElement>(null);
  const firstChapterRef = useRef<HTMLDivElement>(null);
  const secondChapterRef = useRef<HTMLDivElement>(null);
  const thirdChapterRef = useRef<HTMLDivElement>(null);
  const reducedMotion = Boolean(useReducedMotion());
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: stepsRef,
    offset: ["start 82%", "end 34%"],
  });
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.35,
  });
  const storyboardProgress = reducedMotion ? scrollYProgress : smoothScrollProgress;
  const { scrollYProgress: secondChapterEntry } = useScroll({
    target: secondChapterRef,
    offset: ["start end", "end end"],
  });
  const { scrollYProgress: thirdChapterEntry } = useScroll({
    target: thirdChapterRef,
    offset: ["start end", "end end"],
  });
  const discoveryMobileOpacity = useTransform(secondChapterEntry, [0, 1], [1, 0]);
  const offerMobileOpacity = useTransform(
    [secondChapterEntry, thirdChapterEntry],
    ([secondEntry, thirdEntry]: number[]) => Math.max(0, Math.min(secondEntry, 1 - thirdEntry)),
  );
  const contactMobileOpacity = thirdChapterEntry;
  const mobileSceneOpacities = [discoveryMobileOpacity, offerMobileOpacity, contactMobileOpacity] as const;
  const content = landingContent.howItWorks;

  return (
    <section id="jak-to-dziala" className="story-section section-space relative scroll-mt-24">
      <div className="story-mobile-thread lg:hidden" aria-hidden="true">
        <div className="story-mobile-thread-sticky" data-testid="mobile-harvest-scene">
          <HarvestGrowth progress={storyboardProgress} reducedMotion={reducedMotion} variant="mobile" />
        </div>
      </div>

      <div className="site-container relative z-10">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow justify-center">{content.eyebrow}</p>
          <h2 className="section-title mx-auto mt-5">{content.title}</h2>
          <p className="section-lead mx-auto mt-5">{content.description}</p>
        </Reveal>

        <div className="story-layout mt-14 lg:mt-20">
          <div className="story-visual-column" aria-hidden="true">
            <div
              className="story-visual-sticky"
              data-storyboard-motion={reducedMotion ? "crossfade-only" : "full"}
              data-testid="storyboard-visual"
            >
              {storyScenes.map((scene, index) => (
                <StoryboardScene
                  key={scene.id}
                  index={index}
                  isMobile={isMobile}
                  mobileOpacity={mobileSceneOpacities[index]}
                  progress={storyboardProgress}
                  reducedMotion={reducedMotion}
                  scene={scene}
                />
              ))}

              <div className="story-visual-shade" aria-hidden="true" />
              <div className="story-harvest-overlay" aria-hidden="true">
                <HarvestGrowth progress={storyboardProgress} reducedMotion={reducedMotion} />
              </div>
            </div>
          </div>

          <div className="story-chapters">
            <div ref={stepsRef} data-testid="harvest-steps" className="story-chapter-list">
              {content.steps.map((step, index) => {
                const scene = storyScenes[index];
                const chapterRef = index === 0 ? firstChapterRef : index === 1 ? secondChapterRef : thirdChapterRef;

                return (
                  <StoryChapter
                    chapterRef={chapterRef}
                    key={step.id}
                    index={index}
                    isMobile={isMobile}
                    reducedMotion={reducedMotion}
                    scene={scene}
                    step={step}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
