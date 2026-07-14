import { useRef } from "react";
import { ArrowDown, Leaf } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import CtaLink from "@/components/landing/CtaLink";
import { siteConfig } from "@/config/site";
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
    <section ref={heroRef} className="hero-section relative overflow-clip">
      <div aria-hidden="true" className="hero-orb hero-orb--one" />
      <div aria-hidden="true" className="hero-orb hero-orb--two" />
      <div className="site-container relative grid items-center gap-10 lg:grid-cols-[1.03fr_.97fr] lg:gap-16">
        <div className="max-w-3xl">
          <motion.p
            className="eyebrow"
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0.38 : 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Leaf aria-hidden="true" className="hero-eyebrow-leaf size-4" strokeWidth={1.8} />
            {content.eyebrow}
          </motion.p>
          <motion.h1
            className="mt-6 max-w-[14ch] font-display text-[clamp(2.9rem,5.8vw,5.5rem)] font-bold leading-[.95] tracking-[-0.026em] text-[var(--color-olive)]"
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0.46 : 0.65, delay: reducedMotion ? 0.03 : 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            {content.title}
          </motion.h1>
          <motion.p
            className="mt-7 max-w-2xl text-lg leading-8 text-[var(--color-ink-muted)] sm:text-xl sm:leading-9"
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0.44 : 0.6, delay: reducedMotion ? 0.05 : 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            {content.description}
          </motion.p>
          <motion.div
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0.42 : 0.55, delay: reducedMotion ? 0.07 : 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <CtaLink content={content.primaryCta} className="justify-center sm:justify-start" />
            <CtaLink content={content.secondaryCta} className="justify-center sm:justify-start" />
          </motion.div>
        </div>

        <motion.figure
          className="hero-illustration-frame"
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.985, y: 12 }}
          animate={reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0.48 : 0.78, delay: reducedMotion ? 0.04 : 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.img
            src={`${import.meta.env.BASE_URL}landing/hero-storybook.webp`}
            width="1536"
            height="1024"
            alt={content.imageAlt}
            className="hero-image h-full w-full object-cover object-[68%_center]"
            style={reducedMotion ? undefined : { y: imageY, scale: imageScale }}
          />
          <motion.a
            href={siteConfig.links.howItWorks}
            aria-label="Przejdź do historii działania Plonbli"
            className="hero-caption"
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0.38 : 0.45, delay: reducedMotion ? 0.08 : 0.36, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="hero-caption-icon inline-flex size-9 items-center justify-center rounded-full bg-[var(--color-brand)] text-[var(--color-ivory)]">
              <ArrowDown aria-hidden="true" className="size-4" />
            </span>
            <span>
              <strong className="block font-bold text-[var(--color-olive)]">Plonbli rośnie</strong>
              <span className="text-sm text-[var(--color-earth)]">Poznaj historię podczas przewijania</span>
            </span>
          </motion.a>
        </motion.figure>
      </div>
    </section>
  );
}
