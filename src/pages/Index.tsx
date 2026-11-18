import { MotionConfig } from "framer-motion";

import { ForLocalPlacesSection, ForLocalsSection } from "@/components/landing/AudienceSections";
import { AmbientStoryChapter, AmbientStorySequence } from "@/components/landing/AmbientStorySequence";
import FaqSection from "@/components/landing/FaqSection";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import SiteFooter from "@/components/landing/SiteFooter";
import SiteHeader from "@/components/landing/SiteHeader";
import WhySection from "@/components/landing/WhySection";
import { useClientReady } from "@/context/client-ready";

export default function Index() {
  const clientReady = useClientReady();

  return (
    <MotionConfig reducedMotion="user">
      <div
        id="start"
        className="min-h-screen overflow-clip bg-[var(--color-surface)] text-[var(--color-ink)]"
        data-client-ready={clientReady}
      >
        <SiteHeader />
        <main id="tresc-glowna" tabIndex={-1}>
          <HeroSection />
          <WhySection />
          <HowItWorksSection />
          <AmbientStorySequence initialScene="discovery">
            <AmbientStoryChapter scene="discovery">
              <ForLocalsSection />
            </AmbientStoryChapter>
            <AmbientStoryChapter scene="offer">
              <ForLocalPlacesSection />
            </AmbientStoryChapter>
            <AmbientStoryChapter scene="contact">
              <FaqSection />
            </AmbientStoryChapter>
          </AmbientStorySequence>
        </main>
        <SiteFooter />
      </div>
    </MotionConfig>
  );
}
