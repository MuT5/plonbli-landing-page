import { ArrowDownRight, MapPin } from "lucide-react";

import CtaLink from "@/components/landing/CtaLink";
import { siteConfig } from "@/config/site";
import { landingContent } from "@/content/landing.pl";
import { launchCategory } from "@/content/launchCategory";

const sizes = "(min-width: 1440px) 690px, (min-width: 900px) 51vw, calc(100vw - 2.5rem)";
const portrait = "(max-width: 639px) and (orientation: portrait)";

function imageSet(stem: string, widths: number[], ext: string) {
  return widths.map((w) => `${stem}-${w}.${ext} ${w}w`).join(", ");
}

export default function HeroSection() {
  const hero = landingContent.hero;
  const stem = `${import.meta.env.BASE_URL}${launchCategory.hero.asset}`;

  return (
    <section aria-labelledby="atlas-title" className="atlas-intro">
      <div className="site-container atlas-spread">
        <div className="atlas-intro-copy">
          <p className="atlas-kicker"><MapPin aria-hidden="true" />{hero.eyebrow}</p>
          <h1 id="atlas-title"><span>{hero.titleLines[0]}</span>{" "}<span>{hero.titleLines[1]}</span></h1>
          <p className="atlas-deck">{hero.description}</p>
          <div className="atlas-actions">
            <CtaLink content={hero.primaryCta} />
          </div>
        </div>
        <figure className="atlas-cover">
          <div className="atlas-cover-image">
            <picture>
              <source media={portrait} type="image/avif" srcSet={imageSet(stem + "-portrait", [640, 960], "avif")} sizes={sizes} />
              <source media={portrait} type="image/webp" srcSet={imageSet(stem + "-portrait", [640, 960], "webp")} sizes={sizes} />
              <source type="image/avif" srcSet={imageSet(stem, [768, 1280, 1536], "avif")} sizes={sizes} />
              <img className="hero-image" src={stem + "-1280.webp"} srcSet={imageSet(stem, [768, 1280, 1536], "webp")}
                sizes={sizes} alt={hero.imageAlt} width="1536" height="1024" loading="eager" decoding="async" {...{ fetchpriority: "high" }} />
            </picture>
          </div>
          <figcaption>
            <a href={siteConfig.links.howItWorks} className="atlas-caption-link" aria-label={`${hero.caption}. Przejdź do sekcji Jak to działa`}>
              <span className="atlas-plate-index" aria-hidden="true">01</span>
              <span>{hero.caption}</span>
              <ArrowDownRight aria-hidden="true" />
            </a>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
