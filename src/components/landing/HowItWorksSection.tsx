import { useRef } from "react";
import { motion, type MotionValue, useReducedMotion, useScroll, useTransform } from "framer-motion";

import HarvestGrowth from "@/components/landing/HarvestGrowth";
import LandingIcon from "@/components/landing/LandingIcon";
import Reveal from "@/components/landing/Reveal";
import { landingContent } from "@/content/landing.pl";
import { storyScenes, type StoryScene } from "@/content/storyScenes";

interface StoryboardSceneProps {
  progress: MotionValue<number>;
  scene: StoryScene;
}

function StoryboardScene({ progress, scene }: StoryboardSceneProps) {
  const opacity = useTransform(progress, scene.input, scene.output);
  const scale = useTransform(progress, [0, 1], [1.025, 1]);

  return (
    <motion.figure
      className="story-visual-scene"
      data-storyboard-scene={scene.id}
      style={{ opacity, scale }}
    >
      <img
        src={`${import.meta.env.BASE_URL}${scene.desktopSrc}`}
        alt=""
        width="1280"
        height="853"
        className="h-full w-full object-cover"
        loading="lazy"
        decoding="async"
      />
      <figcaption className="story-visual-caption">{scene.label}</figcaption>
    </motion.figure>
  );
}

export default function HowItWorksSection() {
  const stepsRef = useRef<HTMLDivElement>(null);
  const reducedMotion = Boolean(useReducedMotion());
  const { scrollYProgress: desktopGrowthProgress } = useScroll({
    target: stepsRef,
    offset: ["start 82%", "end 34%"],
  });
  const { scrollYProgress: mobileGrowthProgress } = useScroll({
    target: stepsRef,
    offset: ["start 90%", "end 30%"],
  });
  const content = landingContent.howItWorks;

  return (
    <section id="jak-to-dziala" className="story-section section-space relative scroll-mt-24 overflow-clip">
      <div className="story-mobile-thread lg:hidden" aria-hidden="true">
        <div className="story-mobile-thread-sticky" data-testid="mobile-harvest-scene">
          <HarvestGrowth progress={mobileGrowthProgress} reducedMotion={reducedMotion} variant="mobile" />
        </div>
      </div>

      <div className="site-container relative z-10">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow justify-center">{content.eyebrow}</p>
          <h2 className="section-title mt-5">{content.title}</h2>
          <p className="section-lead mx-auto mt-5">{content.description}</p>
        </Reveal>

        <div className="story-layout mt-14 lg:mt-20">
          <div className="story-visual-column hidden lg:block" aria-hidden="true">
            <div className="story-visual-sticky">
              {reducedMotion ? (
                <div className="story-reduced-collage">
                  {storyScenes.map((scene) => (
                    <figure key={scene.id} className="story-reduced-tile">
                      <img
                        src={`${import.meta.env.BASE_URL}${scene.desktopSrc}`}
                        alt=""
                        width="1280"
                        height="853"
                        className="h-full w-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </figure>
                  ))}
                </div>
              ) : (
                storyScenes.map((scene) => (
                  <StoryboardScene key={scene.id} progress={desktopGrowthProgress} scene={scene} />
                ))
              )}

              <div className="story-visual-shade" aria-hidden="true" />
              <div className="story-harvest-overlay" aria-hidden="true">
                <HarvestGrowth progress={desktopGrowthProgress} reducedMotion={reducedMotion} />
              </div>
              <div className="story-progress-rail" aria-hidden="true">
                <motion.span style={reducedMotion ? { scaleY: 1 } : { scaleY: desktopGrowthProgress }} />
              </div>
            </div>
          </div>

          <div ref={stepsRef} data-testid="harvest-steps" className="story-chapters">
            {content.steps.map((step, index) => {
              const scene = storyScenes[index];

              return (
                <motion.article
                  key={step.id}
                  className="harvest-chapter story-chapter"
                  initial={reducedMotion ? false : { opacity: 0.36, y: 18 }}
                  whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.figure
                    className="story-mobile-scene lg:hidden"
                    initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                    whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.28 }}
                    transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <img
                      src={`${import.meta.env.BASE_URL}${scene.mobileSrc}`}
                      alt={scene.alt}
                      width="800"
                      height="1000"
                      className="h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </motion.figure>

                  <div className="story-chapter-copy">
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
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
