import { useState } from "react";
import { ChevronDown } from "lucide-react";

import Reveal from "@/components/landing/Reveal";
import { landingContent } from "@/content/landing.pl";
import { useClientReady } from "@/context/client-ready";
import type { FaqItem as FaqItemContent } from "@/types/landing";

interface FaqItemProps {
  item: FaqItemContent;
}

function FaqItem({ item }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const clientReady = useClientReady();
  const isExpanded = clientReady ? isOpen : true;
  const answerId = `faq-answer-${item.id}`;
  const questionId = `faq-question-${item.id}`;

  return (
    <div>
      <div className="faq-item" data-open={isExpanded}>
        <h3>
          <button
            id={questionId}
            type="button"
            className="faq-item-trigger flex min-h-16 w-full cursor-pointer items-center justify-between gap-5 bg-transparent px-5 py-4 text-left text-xl text-[var(--color-olive)] sm:px-6 sm:text-2xl"
            aria-controls={answerId}
            aria-expanded={isExpanded}
            disabled={!clientReady}
            onClick={() => setIsOpen((open) => !open)}
          >
            <span>{item.question}</span>
            <span aria-hidden="true" className="faq-item-icon inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-surface)]">
              <ChevronDown className={`size-4 motion-safe:transition-transform motion-safe:duration-300${isExpanded ? " rotate-180" : ""}`} />
            </span>
          </button>
        </h3>

        <div
          id={answerId}
          className="faq-item-panel"
          data-faq-answer={item.id}
          role="region"
          aria-labelledby={questionId}
          aria-hidden={!isExpanded}
        >
          <div className="faq-item-panel-clip">
            <div className="faq-item-answer px-5 pb-6 pr-14 text-base leading-7 text-[var(--color-ink-muted)] sm:px-6 sm:text-lg sm:leading-8">
              {item.answer}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FaqSection() {
  const content = landingContent.faq;

  return (
    <section id="faq" className="section-space" tabIndex={-1} aria-labelledby="faq-title">
      <div className="site-container grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
        <Reveal className="lg:sticky lg:top-28">
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 id="faq-title" className="section-title mt-5">{content.title}</h2>
          <p className="section-lead mt-5">{content.description}</p>
        </Reveal>

        <div className="space-y-3">
          {content.items.map((item) => (
            <FaqItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
