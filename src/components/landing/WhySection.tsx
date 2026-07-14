import Reveal from "@/components/landing/Reveal";
import { landingContent } from "@/content/landing.pl";

export default function WhySection() {
  const content = landingContent.why;

  return (
    <section className="why-section section-space relative">
      <div className="site-container">
        <Reveal className="why-story-shell">
          <div className="why-story-heading">
            <p className="eyebrow">{content.eyebrow}</p>
            <h2 className="section-title mt-5">{content.title}</h2>
          </div>

          <div className="why-story-copy">
            {content.paragraphs.map((paragraph, index) => (
              <p key={paragraph} className={index === content.paragraphs.length - 1 ? "why-story-resolution" : undefined}>
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
