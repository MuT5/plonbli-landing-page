import { ArrowDown, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import CtaLink from "@/components/landing/CtaLink";
import { landingContent } from "@/content/landing.pl";

export default function HeroSection() {
  const reducedMotion = useReducedMotion();
  const content = landingContent.hero;

  return (
    <section className="relative overflow-clip pb-16 pt-12 sm:pb-20 sm:pt-16 lg:min-h-[calc(100svh-72px)] lg:pb-24 lg:pt-20">
      <div aria-hidden="true" className="hero-orb hero-orb--one" />
      <div aria-hidden="true" className="hero-orb hero-orb--two" />
      <div className="site-container relative grid items-center gap-12 lg:grid-cols-[1.03fr_.97fr] lg:gap-16">
        <div className="max-w-3xl">
          <p className="eyebrow">
            <Sparkles aria-hidden="true" className="size-4" />
            {content.eyebrow}
          </p>
          <h1 className="mt-6 max-w-[13ch] font-display text-[clamp(2.75rem,6.4vw,5.8rem)] font-bold leading-[1.02] tracking-[-0.035em] text-[var(--color-olive)]">
            {content.title}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--color-ink-muted)] sm:text-xl sm:leading-9">
            {content.description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <CtaLink content={content.primaryCta} className="justify-center sm:justify-start" />
            <CtaLink content={content.secondaryCta} className="justify-center sm:justify-start" />
          </div>
          <p className="mt-6 flex max-w-2xl items-start gap-3 text-sm leading-6 text-[var(--color-earth)]">
            <span aria-hidden="true" className="mt-2 size-2 shrink-0 rounded-full bg-[var(--color-brand)]" />
            {content.note}
          </p>
        </div>

        <motion.figure
          className="hero-illustration-frame"
          initial={reducedMotion ? false : { opacity: 0, scale: 0.98, y: 18 }}
          animate={reducedMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src={`${import.meta.env.BASE_URL}landing/hero-storybook.webp`}
            width="1536"
            height="1024"
            alt={content.imageAlt}
            className="h-full w-full object-cover object-[68%_center]"
          />
          <figcaption className="hero-caption">
            <span className="inline-flex size-9 items-center justify-center rounded-full bg-[var(--color-brand)] text-[var(--color-ivory)]">
              <ArrowDown aria-hidden="true" className="size-4" />
            </span>
            <span>
              <strong className="block font-bold text-[var(--color-olive)]">Plon blisko Ciebie</strong>
              <span className="text-sm text-[var(--color-earth)]">Poznaj historię podczas przewijania</span>
            </span>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
