import { Check, Wheat } from "lucide-react";

import CtaLink from "@/components/landing/CtaLink";
import WaitlistForm from "@/components/landing/WaitlistForm";
import { landingContent } from "@/content/landing.pl";

export function WaitlistSection() {
  const content = landingContent.waitlist;

  return (
    <section id="lista-oczekujacych" className="section-space scroll-mt-24">
      <div className="site-container">
        <div className="waitlist-section-shell grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:gap-16">
          <div className="relative z-10">
            <p className="eyebrow eyebrow--light">{content.eyebrow}</p>
            <h2 className="section-title mt-5 text-[var(--color-ivory)]">{content.title}</h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-[#fff8e7]/80">{content.description}</p>
            <ul className="mt-7 space-y-3">
              {content.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 text-sm font-bold leading-6 text-[#fff8e7]/90 sm:text-base">
                  <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand)]">
                    <Check aria-hidden="true" className="size-3.5" strokeWidth={3} />
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative z-10 self-center">
            <WaitlistForm content={content.form} />
          </div>
          <Wheat aria-hidden="true" className="pointer-events-none absolute -bottom-12 -left-8 size-72 rotate-[-8deg] text-[var(--color-brand)] opacity-15" strokeWidth={0.7} />
        </div>
      </div>
    </section>
  );
}

export function FinalCtaSection() {
  const content = landingContent.finalCta;

  return (
    <section className="pb-20 pt-4 sm:pb-28">
      <div className="site-container">
        <div className="final-cta-shell text-center">
          <p className="eyebrow justify-center">{content.eyebrow}</p>
          <h2 className="section-title mx-auto mt-5 max-w-4xl">{content.title}</h2>
          <p className="section-lead mx-auto mt-5">{content.description}</p>
          <div className="mt-8 flex justify-center">
            <CtaLink content={content.cta} className="justify-center" />
          </div>
          <p className="mt-5 text-sm text-[var(--color-earth)]">{content.note}</p>
        </div>
      </div>
    </section>
  );
}
