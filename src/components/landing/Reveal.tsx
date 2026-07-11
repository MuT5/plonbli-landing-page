import { motion, useReducedMotion } from "framer-motion";
import type { PropsWithChildren } from "react";

interface RevealProps extends PropsWithChildren {
  className?: string;
  delay?: number;
  initialVisible?: boolean;
}

export default function Reveal({ children, className, delay = 0, initialVisible = false }: RevealProps) {
  const reducedMotion = useReducedMotion();
  const shouldAnimate = reducedMotion !== true && !initialVisible;

  return (
    <motion.div
      className={className}
      initial={shouldAnimate ? { opacity: 0, y: 20, scale: 0.992 } : false}
      whileInView={shouldAnimate ? { opacity: 1, y: 0, scale: 1 } : undefined}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.68, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
