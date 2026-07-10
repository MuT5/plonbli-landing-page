import { motion, type MotionValue, useTransform } from "framer-motion";

interface HarvestGrowthProps {
  progress: MotionValue<number>;
  reducedMotion?: boolean;
  variant?: "desktop" | "mobile";
}

export default function HarvestGrowth({ progress, reducedMotion = false, variant = "desktop" }: HarvestGrowthProps) {
  const clipPath = useTransform(progress, [0.02, 0.68], ["inset(96% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]);
  const scale = useTransform(progress, [0.02, 0.68], [0.965, 1]);

  return (
    <div className={`harvest-growth harvest-growth--${variant}`} aria-hidden="true" data-harvest-variant={variant}>
      <motion.div
        data-testid={`harvest-reveal-${variant}`}
        className="harvest-reveal"
        style={reducedMotion ? undefined : { clipPath, scale }}
      >
        <img
          data-testid={`harvest-raster-${variant}`}
          src={`${import.meta.env.BASE_URL}landing/growing-harvest.webp`}
          width="740"
          height="1824"
          alt=""
          aria-hidden="true"
          decoding="async"
          loading={variant === "mobile" ? "lazy" : "eager"}
          className="harvest-raster"
        />
      </motion.div>
    </div>
  );
}
