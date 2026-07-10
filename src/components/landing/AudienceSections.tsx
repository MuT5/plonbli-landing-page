import { ArrowDownRight } from "lucide-react";

import CtaLink from "@/components/landing/CtaLink";
import LandingIcon from "@/components/landing/LandingIcon";
import Reveal from "@/components/landing/Reveal";
import { landingContent } from "@/content/landing.pl";

export function ForLocalsSection() {
  const local = landingContent.forLocals;

  return (
    <section id="dla-szukajacych-lokalnie" className="section-space scroll-mt-24">
      <div className="site-container grid items-start gap-12 lg:grid-cols-[.82fr_1.18fr] lg:gap-20">
        <Reveal className="lg:sticky lg:top-28">
          <p className="eyebrow">{local.eyebrow}</p>
          <h2 className="section-title mt-5">{local.title}</h2>
          <p className="section-lead mt-5">{local.description}</p>
        </Reveal>

        <div className="grid gap-5">
          {local.benefits.map((benefit, index) => (
            <Reveal key={benefit.id} delay={index * 0.06}>
              <article className="benefit-card">
                <span className="benefit-icon"><LandingIcon name={benefit.icon} className="size-6" /></span>
                <div>
                  <h3 className="font-display text-2xl font-bold text-[var(--color-olive)] sm:text-3xl">{benefit.title}</h3>
                  <p className="mt-3 text-base leading-7 text-[var(--color-ink-muted)] sm:text-lg sm:leading-8">{benefit.description}</p>
                </div>
                <ArrowDownRight aria-hidden="true" className="ml-auto hidden size-6 shrink-0 text-[var(--color-border)] sm:block" />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ForFarmsSection() {
  const farms = landingContent.forFarms;

  return (
    <section id="dla-gospodarstw" className="section-space scroll-mt-24">
      <div className="site-container">
        <div className="farm-section-shell grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">{farms.eyebrow}</p>
            <h2 className="section-title mt-5">{farms.title}</h2>
            <p className="section-lead mt-5">{farms.description}</p>
            <div className="mt-8">
              <CtaLink content={farms.cta} className="justify-center border-[var(--color-olive)] bg-[var(--color-olive)] text-[var(--color-ivory)] hover:bg-[#3f5629] sm:justify-start" />
            </div>
          </Reveal>
          <div className="grid gap-4">
            {farms.benefits.map((benefit, index) => (
              <Reveal key={benefit.id} delay={index * 0.06}>
                <article className="farm-benefit-card">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-brand)] text-[var(--color-ivory)]">
                    <LandingIcon name={benefit.icon} className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-[var(--color-olive)]">{benefit.title}</h3>
                    <p className="mt-2 leading-7 text-[var(--color-ink-muted)]">{benefit.description}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AudienceSections() {
  return (
    <>
      <ForLocalsSection />
      <ForFarmsSection />
    </>
  );
}
