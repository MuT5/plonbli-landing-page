import { motion, type MotionValue, useTransform } from "framer-motion";

interface HarvestGrowthProps {
  progress: MotionValue<number>;
}

interface MobileHarvestStageProps {
  stage: 1 | 2 | 3;
  reducedMotion?: boolean;
}

export default function HarvestGrowth({ progress }: HarvestGrowthProps) {
  const clipPath = useTransform(progress, [0.04, 0.68], ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]);

  return (
    <div className="harvest-growth" aria-hidden="true">
      <motion.div
        data-testid="harvest-reveal"
        className="harvest-reveal"
        style={{ clipPath }}
      >
        <img
          data-testid="harvest-raster"
          src={`${import.meta.env.BASE_URL}landing/growing-harvest.webp`}
          width="740"
          height="1824"
          alt=""
          aria-hidden="true"
          decoding="async"
          loading="eager"
          className="harvest-raster"
        />
      </motion.div>
    </div>
  );
}

const mobileClipPaths = {
  1: "inset(68% 0% 0% 0%)",
  2: "inset(34% 0% 0% 0%)",
  3: "inset(0% 0% 0% 0%)",
} as const;

export function MobileHarvestStage({ stage, reducedMotion = false }: MobileHarvestStageProps) {
  const targetClipPath = mobileClipPaths[stage];

  return (
    <motion.div
      className="mobile-harvest-stage lg:hidden"
      aria-hidden="true"
      initial={reducedMotion ? false : { clipPath: "inset(100% 0% 0% 0%)", opacity: 0.4 }}
      whileInView={reducedMotion ? undefined : { clipPath: targetClipPath, opacity: 1 }}
      style={reducedMotion ? { clipPath: targetClipPath } : undefined}
      viewport={{ once: true, amount: 0.55 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <img
        src={`${import.meta.env.BASE_URL}landing/growing-harvest.webp`}
        width="740"
        height="1824"
        alt=""
        aria-hidden="true"
        decoding="async"
        loading="lazy"
      />
    </motion.div>
  );
}
