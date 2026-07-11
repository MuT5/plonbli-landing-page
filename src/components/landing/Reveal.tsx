import { motion, useReducedMotion } from "framer-motion";
import type { PropsWithChildren } from "react";

interface RevealProps extends PropsWithChildren {
  className?: string;
  delay?: number;
  initialVisible?: boolean;
}

export default function Reveal({ children, className, delay = 0, initialVisible = false }: RevealProps) {
  const reducedMotion = Boolean(useReducedMotion());
  const shouldReveal = !initialVisible;

  return (
    <motion.div
      className={className}
      initial={shouldReveal ? (reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.992 }) : false}
      whileInView={shouldReveal ? (reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }) : undefined}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: reducedMotion ? 0.46 : 0.68,
        delay: reducedMotion ? Math.min(delay, 0.08) : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
