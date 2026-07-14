import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import Reveal from "@/components/landing/Reveal";
import { landingContent } from "@/content/landing.pl";
import type { FaqItem as FaqItemContent } from "@/types/landing";

interface FaqItemProps {
  index: number;
  item: FaqItemContent;
}

function FaqItem({ index, item }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const reducedMotion = Boolean(useReducedMotion());
  const answerId = `faq-answer-${item.id}`;
  const questionId = `faq-question-${item.id}`;

  return (
    <Reveal delay={index * 0.05}>
      <div className="faq-item" data-open={isOpen}>
        <h3>
          <button
            id={questionId}
            type="button"
            className="faq-item-trigger flex min-h-16 w-full cursor-pointer items-center justify-between gap-5 bg-transparent px-5 py-4 text-left font-display text-xl font-bold text-[var(--color-olive)] sm:px-6 sm:text-2xl"
            aria-controls={answerId}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((open) => !open)}
          >
            <span>{item.question}</span>
          <motion.span
            aria-hidden="true"
            className="faq-item-icon inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-surface)]"
            animate={{
              rotate: isOpen ? 180 : 0,
              scale: isOpen && !reducedMotion ? 1.04 : 1,
            }}
            transition={{ duration: reducedMotion ? 0.16 : 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <ChevronDown className="size-4" />
            </motion.span>
          </button>
        </h3>

        <div
          id={answerId}
          className="faq-item-panel"
          data-faq-answer={item.id}
          role="region"
          aria-labelledby={questionId}
          aria-hidden={!isOpen}
        >
          <div className="faq-item-panel-clip">
            <div className="faq-item-answer px-5 pb-6 pr-14 text-base leading-7 text-[var(--color-ink-muted)] sm:px-6 sm:text-lg sm:leading-8">
              {item.answer}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

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
            <FaqItem key={item.id} index={index} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
