import { AnimatePresence } from "framer-motion";
import { useEffect, useLayoutEffect, useState } from "react";

import { ClientReadyProvider } from "@/context/client-ready";
import Index from "@/pages/Index";

interface AppProps {
  initialAnimations?: boolean;
}

const useHydrationLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export default function App({ initialAnimations = true }: AppProps) {
  const [clientReady, setClientReady] = useState(initialAnimations);

  useHydrationLayoutEffect(() => {
    if (!clientReady) setClientReady(true);
  }, [clientReady]);

  if (!clientReady) {
    return (
      <ClientReadyProvider value={false}>
        <AnimatePresence initial={false}>
          <Index key="prerendered" />
        </AnimatePresence>
      </ClientReadyProvider>
    );
  }

  return (
    <ClientReadyProvider value>
      <Index key="interactive" />
    </ClientReadyProvider>
  );
}
