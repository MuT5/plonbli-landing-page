import { useRef } from "react";
import { ArrowDown, Sparkles } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import CtaLink from "@/components/landing/CtaLink";
import { landingContent } from "@/content/landing.pl";

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const reducedMotion = Boolean(useReducedMotion());
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [-4, 12]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.08]);
  const content = landingContent.hero;

  return (
    <section ref={heroRef} className="relative overflow-clip pb-14 pt-10 sm:pb-20 sm:pt-16 lg:min-h-[calc(100svh-72px)] lg:pb-24 lg:pt-20">
      <div aria-hidden="true" className="hero-orb hero-orb--one" />
      <div aria-hidden="true" className="hero-orb hero-orb--two" />
      <div className="site-container relative grid items-center gap-10 lg:grid-cols-[1.03fr_.97fr] lg:gap-16">
        <div className="max-w-3xl">
          <motion.p
            className="eyebrow"
            initial={reducedMotion ? false : { opacity: 0, y: 10 }}
            animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Sparkles aria-hidden="true" className="size-4" />
            {content.eyebrow}
          </motion.p>
          <motion.h1
            className="mt-6 max-w-[12ch] font-display text-[clamp(3rem,6.4vw,6rem)] font-bold leading-[.94] tracking-[-0.026em] text-[var(--color-olive)]"
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            {content.title}
          </motion.h1>
          <motion.p
            className="mt-7 max-w-2xl text-lg leading-8 text-[var(--color-ink-muted)] sm:text-xl sm:leading-9"
            initial={reducedMotion ? false : { opacity: 0, y: 14 }}
            animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            {content.description}
          </motion.p>
          <motion.div
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <CtaLink content={content.primaryCta} className="justify-center sm:justify-start" />
            <CtaLink content={content.secondaryCta} className="justify-center sm:justify-start" />
          </motion.div>
        </div>

        <motion.figure
          className="hero-illustration-frame"
          initial={reducedMotion ? false : { scale: 0.985, y: 12 }}
          animate={reducedMotion ? undefined : { scale: 1, y: 0 }}
          transition={{ duration: 0.78, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.img
            src={`${import.meta.env.BASE_URL}landing/hero-storybook.webp`}
            width="1536"
            height="1024"
            alt={content.imageAlt}
            className="hero-image h-full w-full object-cover object-[68%_center]"
            style={reducedMotion ? undefined : { y: imageY, scale: imageScale }}
          />
          <motion.figcaption
            className="hero-caption"
            initial={reducedMotion ? false : { opacity: 0, y: 8 }}
            animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex size-9 items-center justify-center rounded-full bg-[var(--color-brand)] text-[var(--color-ivory)]">
              <ArrowDown aria-hidden="true" className="size-4" />
            </span>
            <span>
              <strong className="block font-bold text-[var(--color-olive)]">Plonbli rośnie</strong>
              <span className="text-sm text-[var(--color-earth)]">Poznaj historię podczas przewijania</span>
            </span>
          </motion.figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
