import { useEffect, useRef } from "react";

import LandingIcon from "@/components/landing/LandingIcon";
import { landingContent } from "@/content/landing.pl";
import { storyScenes, type StoryScene } from "@/content/storyScenes";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { atlasScrollState } from "@/lib/atlas-scroll";
import "./atlas-story.css";

function ScenePicture({ scene, decorative = false }: { scene: StoryScene; decorative?: boolean }) {
  const base = import.meta.env.BASE_URL;
  const mobile = base + scene.mobileSrc;
  const desktop = base + scene.desktopSrc;
  const srcSet = (url: string, wide: string) => `${url} 640w, ${wide} 960w`;
  return (
    <picture>
      <source
        type="image/avif"
        srcSet={srcSet(mobile.replace(/\.webp$/, ".avif"), desktop.replace(/\.webp$/, ".avif"))}
        sizes="(min-width: 900px) 46vw, 92vw"
      />
      <img src={mobile} srcSet={srcSet(mobile, desktop)} sizes="(min-width: 900px) 46vw, 92vw"
        alt={decorative ? "" : scene.alt} width="960" height="640" loading="lazy" decoding="async" />
    </picture>
  );
}

function AtlasRoute() {
  const path = "M10 44h19c12 0 10-19 23-19h9c9 0 8 12 18 12h8c10 0 11-11 18-15";
  return (
    <svg className="atlas-route" data-testid="atlas-route" aria-hidden="true" viewBox="0 0 121 58" fill="none">
      <path d={path} stroke="var(--color-border)" strokeWidth="1.5" strokeDasharray="2.5 3.5" />
      <path className="atlas-route-ink" d={path} pathLength="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="1" />
      <circle cx="10" cy="44" r="2.5" fill="currentColor" />
      <path d="M105 24s-7-8-7-12a7 7 0 1 1 14 0c0 4-7 12-7 12Z" fill="var(--color-sun)" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="105" cy="12" r="2.3" fill="currentColor" />
    </svg>
  );
}

export default function HowItWorksSection() {
  const layoutRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const content = landingContent.howItWorks;

  useEffect(() => {
    const layout = layoutRef.current;
    const stage = photoRef.current;
    if (!layout || !stage || reduced) return;
    const mobile = window.matchMedia("(max-width: 899px)");
    const copies = [...layout.querySelectorAll<HTMLElement>("[data-story-card]")];
    const layers = [...stage.querySelectorAll<HTMLElement>("[data-storyboard-scene]")];
    let frame = 0;
    let onScreen = true;
    const draw = () => {
      frame = 0;
      if (!stage.clientHeight) return;
      const result = atlasScrollState(copies.map((el) => el.getBoundingClientRect()), window.innerHeight, stage.getBoundingClientRect().bottom, mobile.matches);
      layers.forEach((el, i) => { el.style.opacity = String(result.photos[i]); });
      copies.forEach((el, i) => { el.style.setProperty("--atlas-copy-opacity", String(result.copy[i])); });
      stage.style.setProperty("--atlas-route-remaining", String(0.92 * (1 - result.progress)));
    };
    const queue = () => { if (onScreen && !frame) frame = window.requestAnimationFrame(draw); };
    const visibility = typeof IntersectionObserver !== "undefined" ? new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) queue();
    }, { rootMargin: "100% 0px" }) : undefined;
    visibility?.observe(layout);
    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(queue) : undefined;
    [stage, ...copies].forEach((el) => observer?.observe(el));
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    draw();
    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
      visibility?.disconnect();
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
      layers.forEach((el) => el.style.removeProperty("opacity"));
      copies.forEach((el) => el.style.removeProperty("--atlas-copy-opacity"));
      stage.style.removeProperty("--atlas-route-remaining");
    };
  }, [reduced]);

  return (
    <section id="jak-to-dziala" className="atlas-story section-space" tabIndex={-1} aria-labelledby="atlas-heading">
      <div className="site-container">
        <header className="atlas-story-heading">
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 id="atlas-heading" className="section-title">{content.title}</h2>
          <p className="section-lead">{content.description}</p>
        </header>
        <div ref={layoutRef} className="atlas-story-layout" data-storyboard-motion={reduced ? "static" : "scroll"}>
          <div ref={photoRef} className="atlas-story-stage" data-testid="storyboard-visual" aria-hidden="true">
            {storyScenes.map((scene) => (
              <div className="atlas-story-layer" data-storyboard-scene={scene.id} key={scene.id}>
                <ScenePicture scene={scene} decorative />
              </div>
            ))}
            <AtlasRoute />
          </div>
          <ol className="atlas-story-list" role="list">
            {content.steps.map((step, i) => {
              const scene = storyScenes[i];
              return (
                <li key={scene.id} className="atlas-story-step" data-story-step={step.number}>
                  <div className="atlas-static-frame" data-static-scene={scene.id}><ScenePicture scene={scene} /></div>
                  <div className="atlas-story-copy" data-story-card={step.number}>
                    <p className="atlas-step-index">
                      <span className="atlas-step-number" aria-hidden="true">{String(step.number).padStart(2, "0")}</span>
                      <LandingIcon name={step.icon} className="atlas-step-icon" />
                      {scene.label}
                    </p>
                    <h3>{step.title}</h3>
                    <p className="atlas-step-description">{step.description}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
