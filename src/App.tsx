import { useEffect, useLayoutEffect, useState } from "react";

import { ClientReadyProvider } from "@/context/client-ready";
import Index from "@/pages/Index";

interface AppProps {
  initialClientReady?: boolean;
}

const useHydrationLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export default function App({ initialClientReady = true }: AppProps) {
  const [clientReady, setClientReady] = useState(initialClientReady);

  useHydrationLayoutEffect(() => {
    if (!clientReady) setClientReady(true);
  }, [clientReady]);

  return (
    <ClientReadyProvider value={clientReady}>
      <Index />
    </ClientReadyProvider>
  );
}
