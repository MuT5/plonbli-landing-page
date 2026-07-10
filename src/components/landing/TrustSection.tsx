import { CheckCircle2 } from "lucide-react";

import Reveal from "@/components/landing/Reveal";
import { landingContent } from "@/content/landing.pl";

export default function TrustSection() {
  const content = landingContent.trust;

  return (
    <section className="section-space bg-[var(--color-ivory)]/68">
      <div className="site-container grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
        <Reveal>
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 className="section-title mt-5">{content.title}</h2>
          <p className="section-lead mt-5">{content.description}</p>
        </Reveal>
        <div className="grid gap-4 self-center">
          {content.points.map((point, index) => (
            <Reveal key={point} delay={index * 0.06}>
              <div className="flex items-start gap-4 rounded-3xl border border-[var(--color-border)] bg-white/55 p-5 sm:p-6">
                <CheckCircle2 aria-hidden="true" className="mt-0.5 size-6 shrink-0 text-[var(--color-brand)]" />
                <p className="text-base font-bold leading-7 text-[var(--color-olive)] sm:text-lg">{point}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
