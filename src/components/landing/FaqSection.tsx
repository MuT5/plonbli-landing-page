import { ChevronDown } from "lucide-react";

import Reveal from "@/components/landing/Reveal";
import { landingContent } from "@/content/landing.pl";

export default function FaqSection() {
  const content = landingContent.faq;

  return (
    <section id="faq" className="section-space scroll-mt-24">
      <div className="site-container grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
        <Reveal className="lg:sticky lg:top-28">
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 className="section-title mt-5">{content.title}</h2>
          <p className="section-lead mt-5">{content.description}</p>
        </Reveal>

        <div className="space-y-3">
          {content.items.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.05}>
              <details className="group faq-item">
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 px-5 py-4 font-display text-xl font-bold text-[var(--color-olive)] marker:content-none sm:px-6 sm:text-2xl">
                  {item.question}
                  <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-surface)] transition group-open:rotate-180">
                    <ChevronDown aria-hidden="true" className="size-4" />
                  </span>
                </summary>
                <div className="px-5 pb-6 pr-14 text-base leading-7 text-[var(--color-ink-muted)] sm:px-6 sm:text-lg sm:leading-8">
                  {item.answer}
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
