import { useEffect, useRef, useState, type PropsWithChildren } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface RevealProps extends PropsWithChildren {
  className?: string;
  delay?: number;
}

export default function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || reducedMotion || entered || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setEntered(true);
      observer.disconnect();
    }, { threshold: 0.15 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [entered, reducedMotion]);

  return (
    <div
      ref={ref}
      className={className}
      data-atlas-enter={entered || undefined}
      style={entered && delay ? { animationDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
