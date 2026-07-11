import { Check } from "lucide-react";

import CtaLink from "@/components/landing/CtaLink";
import Reveal from "@/components/landing/Reveal";
import WaitlistForm from "@/components/landing/WaitlistForm";
import { landingContent } from "@/content/landing.pl";

export function WaitlistSection() {
  const content = landingContent.waitlist;

  return (
    <section id="lista-oczekujacych" className="section-space scroll-mt-24">
      <div className="site-container">
        <div className="waitlist-section-shell grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:gap-16">
          <Reveal className="relative z-10">
            <p className="eyebrow eyebrow--light">{content.eyebrow}</p>
            <h2 className="section-title mt-5 text-[var(--color-ivory)]">{content.title}</h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-[#fff8e7]/80">{content.description}</p>
          </Reveal>
          <Reveal
            className="conversion-reveal relative z-10 self-center lg:col-start-2 lg:row-span-2 lg:row-start-1"
            delay={0.08}
            initialVisible
          >
            <WaitlistForm content={content.form} />
          </Reveal>
          <Reveal className="relative z-10 lg:col-start-1 lg:row-start-2" delay={0.16}>
            <ul className="space-y-3">
              {content.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 text-sm font-bold leading-6 text-[#fff8e7]/90 sm:text-base">
                  <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand)]">
                    <Check aria-hidden="true" className="size-3.5" strokeWidth={3} />
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function FinalCtaSection() {
  const content = landingContent.finalCta;

  return (
    <section className="pb-16 pt-2 sm:pb-24">
      <div className="site-container">
        <div className="final-cta-shell text-center">
          <Reveal className="conversion-reveal relative z-10" initialVisible>
            <p className="eyebrow justify-center">{content.eyebrow}</p>
            <h2 className="section-title mx-auto mt-5 max-w-4xl">{content.title}</h2>
            <p className="section-lead mx-auto mt-5">{content.description}</p>
            <div className="mt-8 flex justify-center">
              <CtaLink content={content.cta} className="final-cta-button justify-center" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
