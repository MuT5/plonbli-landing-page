import { ArrowDownRight, Wheat } from "lucide-react";

import CtaLink from "@/components/landing/CtaLink";
import LandingIcon from "@/components/landing/LandingIcon";
import Reveal from "@/components/landing/Reveal";
import { landingContent } from "@/content/landing.pl";

export default function AudienceSections() {
  const local = landingContent.forLocals;
  const farms = landingContent.forFarms;

  return (
    <>
      <section id="dla-szukajacych-lokalnie" className="section-space scroll-mt-24">
        <div className="site-container grid items-start gap-12 lg:grid-cols-[.82fr_1.18fr] lg:gap-20">
          <Reveal className="lg:sticky lg:top-28">
            <p className="eyebrow">{local.eyebrow}</p>
            <h2 className="section-title mt-5">{local.title}</h2>
            <p className="section-lead mt-5">{local.description}</p>
            <div aria-hidden="true" className="mt-10 hidden max-w-sm lg:block">
              <div className="organic-field-card">
                <Wheat className="size-16 text-[var(--color-brand)]" strokeWidth={1.2} />
                <p className="mt-5 font-display text-3xl font-bold text-[var(--color-olive)]">Blisko. Czytelnie. Bezpośrednio.</p>
              </div>
            </div>
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

      <section id="dla-gospodarstw" className="section-space scroll-mt-24">
        <div className="site-container">
          <div className="farm-section-shell grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
            <div>
              <p className="eyebrow eyebrow--light">{farms.eyebrow}</p>
              <h2 className="section-title mt-5 text-[var(--color-ivory)]">{farms.title}</h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[#fff8e7]/80">{farms.description}</p>
              <div className="mt-8">
                <CtaLink content={farms.cta} className="justify-center border-[var(--color-ivory)] bg-[var(--color-ivory)] text-[var(--color-olive)] hover:bg-white sm:justify-start" />
              </div>
              <p className="mt-5 text-sm leading-6 text-[#fff8e7]/70">{farms.note}</p>
            </div>
            <div className="grid gap-4">
              {farms.benefits.map((benefit) => (
                <article key={benefit.id} className="farm-benefit-card">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-brand)] text-[var(--color-ivory)]">
                    <LandingIcon name={benefit.icon} className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-[var(--color-ivory)]">{benefit.title}</h3>
                    <p className="mt-2 leading-7 text-[#fff8e7]/75">{benefit.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
