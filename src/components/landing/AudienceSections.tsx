import CtaLink from "@/components/landing/CtaLink";
import LandingIcon from "@/components/landing/LandingIcon";
import Reveal from "@/components/landing/Reveal";
import { landingContent } from "@/content/landing.pl";

export function ForLocalsSection() {
  const local = landingContent.forLocals;

  return (
    <section id="dla-szukajacych-lokalnie" className="section-space" tabIndex={-1} aria-labelledby="for-locals-heading">
      <div className="site-container grid items-start gap-12 lg:grid-cols-[.82fr_1.18fr] lg:gap-20">
        <Reveal className="lg:sticky lg:top-28">
          <p className="eyebrow">{local.eyebrow}</p>
          <h2 id="for-locals-heading" className="section-title mt-5">{local.title}</h2>
          <p className="section-lead mt-5">{local.description}</p>
        </Reveal>

        <div className="grid gap-5">
          {local.benefits.map((benefit, index) => (
            <Reveal key={benefit.id} delay={index * 0.06}>
              <article className="benefit-card">
                <span className="benefit-icon"><LandingIcon name={benefit.icon} className="size-6" /></span>
                <div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ForLocalPlacesSection() {
  const places = landingContent.forLocalPlaces;

  return (
    <section id="dla-lokalnych-miejsc" className="section-space relative" tabIndex={-1} aria-labelledby="for-places-heading">
      <span id="dla-gospodarstw" aria-hidden="true" className="absolute top-0" />
      <div className="site-container">
        <div className="local-places-section-shell grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">{places.eyebrow}</p>
            <h2 id="for-places-heading" className="section-title mt-5">{places.title}</h2>
            <p className="section-lead mt-5">{places.description}</p>
            <div className="mt-8">
              <CtaLink content={places.cta} />
            </div>
          </Reveal>
          <div className="grid gap-4">
            {places.benefits.map((benefit, index) => (
              <Reveal key={benefit.id} delay={index * 0.06}>
                <article className="local-places-benefit-card">
                  <span>
                    <LandingIcon name={benefit.icon} className="size-6" />
                  </span>
                  <div>
                    <h3>{benefit.title}</h3>
                    <p>{benefit.description}</p>
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
      <ForLocalPlacesSection />
    </>
  );
}
