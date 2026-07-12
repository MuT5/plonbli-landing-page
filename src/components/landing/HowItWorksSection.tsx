import { useRef } from "react";
import { motion, type MotionStyle, type MotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

import HarvestGrowth from "@/components/landing/HarvestGrowth";
import LandingIcon from "@/components/landing/LandingIcon";
import Reveal from "@/components/landing/Reveal";
import { landingContent } from "@/content/landing.pl";
import { storyScenes, type StoryScene } from "@/content/storyScenes";
import { useIsMobile } from "@/hooks/use-mobile";

interface StoryboardSceneProps {
  index: number;
  progress: MotionValue<number>;
  reducedMotion: boolean;
  scene: StoryScene;
}

function StoryboardScene({ index, progress, reducedMotion, scene }: StoryboardSceneProps) {
  const opacity = useTransform(progress, scene.input, scene.output);
  const scale = useTransform(progress, [0, 1], [1.025, 1]);

  return (
    <motion.figure
      className="story-visual-scene"
      data-storyboard-scene={scene.id}
      data-storyboard-step={index + 1}
      style={reducedMotion ? { opacity } : { opacity, scale }}
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
  index: number;
  isMobile: boolean;
  progress: MotionValue<number>;
  reducedMotion: boolean;
  scene: StoryScene;
  step: (typeof landingContent.howItWorks.steps)[number];
}

type StoryChapterMotionStyle = MotionStyle & {
  "--story-chapter-opacity": MotionValue<number>;
};

function StoryChapter({ index, isMobile, progress, reducedMotion, scene, step }: StoryChapterProps) {
  const isFinalChapter = index === storyScenes.length - 1;
  const fadeStart = scene.input[scene.input.length - 2];
  const fadeEnd = scene.input[scene.input.length - 1];
  const opacity = useTransform(
    progress,
    isFinalChapter ? [0, 1] : [0, fadeStart, fadeEnd],
    isFinalChapter ? [1, 1] : [1, 1, 0.08],
  );
  const scrollFadeStyle: StoryChapterMotionStyle = { "--story-chapter-opacity": opacity };
  const revealOnEntry = !isMobile && !reducedMotion;

  return (
    <motion.article
      className="harvest-chapter story-chapter"
      data-mobile-scroll-fade="responsive"
      data-story-step={index + 1}
      initial={revealOnEntry ? { opacity: 0.36, y: 18 } : false}
      whileInView={revealOnEntry ? { opacity: 1, y: 0 } : undefined}
      viewport={revealOnEntry ? { once: true, amount: 0.2 } : undefined}
      transition={{ duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div className="story-chapter-copy" style={scrollFadeStyle}>
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

                return (
                  <StoryChapter
                    key={step.id}
                    index={index}
                    isMobile={isMobile}
                    progress={storyboardProgress}
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
