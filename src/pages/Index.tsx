import { MotionConfig } from "framer-motion";

import { ForFarmsSection, ForLocalsSection } from "@/components/landing/AudienceSections";
import { AmbientStoryChapter, AmbientStorySequence } from "@/components/landing/AmbientStorySequence";
import FaqSection from "@/components/landing/FaqSection";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import SiteFooter from "@/components/landing/SiteFooter";
import SiteHeader from "@/components/landing/SiteHeader";
import { FinalCtaSection, WaitlistSection } from "@/components/landing/WaitlistSection";

export default function Index() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen overflow-clip bg-[var(--color-surface)] text-[var(--color-ink)]">
        <SiteHeader />
        <main id="tresc-glowna">
          <HeroSection />
          <HowItWorksSection />
          <AmbientStorySequence>
            <AmbientStoryChapter scene="contact">
              <WaitlistSection />
            </AmbientStoryChapter>
            <AmbientStoryChapter scene="discovery">
              <ForLocalsSection />
            </AmbientStoryChapter>
            <AmbientStoryChapter scene="offer">
              <ForFarmsSection />
            </AmbientStoryChapter>
            <AmbientStoryChapter scene="contact">
              <FaqSection />
              <FinalCtaSection />
            </AmbientStoryChapter>
          </AmbientStorySequence>
        </main>
        <SiteFooter />
      </div>
    </MotionConfig>
  );
}
