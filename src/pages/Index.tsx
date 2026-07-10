import { MotionConfig } from "framer-motion";

import AudienceSections from "@/components/landing/AudienceSections";
import FaqSection from "@/components/landing/FaqSection";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import SiteFooter from "@/components/landing/SiteFooter";
import SiteHeader from "@/components/landing/SiteHeader";
import TrustSection from "@/components/landing/TrustSection";
import { FinalCtaSection, WaitlistSection } from "@/components/landing/WaitlistSection";

export default function Index() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen overflow-clip bg-[var(--color-surface)] text-[var(--color-ink)]">
        <SiteHeader />
        <main id="tresc-glowna">
          <HeroSection />
          <HowItWorksSection />
          <WaitlistSection />
          <AudienceSections />
          <TrustSection />
          <FaqSection />
          <FinalCtaSection />
        </main>
        <SiteFooter />
      </div>
    </MotionConfig>
  );
}
