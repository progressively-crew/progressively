import { CacheProvider } from "@emotion/react";
import React from "react";
import ReactDOM from "react-dom";
import { RemixBrowser } from "remix";
import ClientStyleContext from "./_chakra-setup/context.client";
import createEmotionCache from "./_chakra-setup/createMotionCache";

interface ClientCacheProviderProps {
  children: React.ReactNode;
}

function ClientCacheProvider({ children }: ClientCacheProviderProps) {
  const [cache, setCache] = React.useState(createEmotionCache());

  function reset() {
    setCache(createEmotionCache());
  }

  return (
    <ClientStyleContext.Provider value={{ reset }}>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </ClientStyleContext.Provider>
  );
}

ReactDOM.hydrate(
  <ClientCacheProvider>
    <RemixBrowser />
  </ClientCacheProvider>,
  document
);
