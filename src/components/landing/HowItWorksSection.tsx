import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

import HarvestGrowth, { MobileHarvestStage } from "@/components/landing/HarvestGrowth";
import LandingIcon from "@/components/landing/LandingIcon";
import { landingContent } from "@/content/landing.pl";

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = Boolean(useReducedMotion());
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 82%", "end 28%"],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 82, damping: 26, mass: 0.3 });
  const growthProgress = reducedMotion ? scrollYProgress : smoothProgress;
  const content = landingContent.howItWorks;

  return (
    <section id="jak-to-dziala" ref={sectionRef} className="section-space scroll-mt-24 bg-[var(--color-ivory)]/70">
      <div className="site-container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow justify-center">{content.eyebrow}</p>
          <h2 className="section-title mt-5">{content.title}</h2>
          <p className="section-lead mx-auto mt-5">{content.description}</p>
        </div>

        <div className={`mt-12 grid items-start gap-8 lg:grid-cols-[minmax(14rem,.68fr)_minmax(0,1.32fr)] lg:gap-16 ${reducedMotion ? "" : "lg:mt-16"}`}>
          <div className="harvest-sticky sticky top-24 hidden h-[calc(100svh-7rem)] min-h-[26rem] max-h-[44rem] lg:block">
            <div className="harvest-accent h-full">
              <HarvestGrowth progress={growthProgress} />
            </div>
          </div>

          <div className={reducedMotion ? "space-y-5 lg:pb-60 lg:pt-8" : "space-y-5 lg:space-y-[14svh] lg:py-[8svh]"}>
            {content.steps.map((step) => (
              <motion.article
                key={step.id}
                className={`harvest-chapter story-card ${reducedMotion ? "" : "lg:min-h-[42svh]"}`}
                initial={reducedMotion ? false : { opacity: 0.42, y: 24 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ amount: 0.58 }}
                transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex h-full items-center">
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <span className="step-icon">
                          <LandingIcon name={step.icon} className="size-6" />
                        </span>
                        <span className="font-display text-4xl font-bold text-[var(--color-border)] sm:text-5xl">0{step.number}</span>
                      </div>
                      <MobileHarvestStage stage={step.number} reducedMotion={reducedMotion} />
                    </div>
                    <h3 className="mt-7 font-display text-3xl font-bold text-[var(--color-olive)] sm:text-4xl">{step.title}</h3>
                    <p className="mt-4 max-w-xl text-base leading-7 text-[var(--color-ink-muted)] sm:text-lg sm:leading-8">{step.description}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        <p className="mx-auto mt-10 max-w-3xl rounded-2xl border border-[var(--color-border)] bg-white/45 px-5 py-4 text-center text-sm leading-6 text-[var(--color-earth)]">
          {content.note}
        </p>
      </div>
    </section>
  );
}
