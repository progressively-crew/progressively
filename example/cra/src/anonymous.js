import React from "react";
import { ProgressivelyProvider, useFlags } from "@progressively/react";

const FlaggedComponent = () => {
  const { flags } = useFlags();

  return (
    <main>
      <div>
        <h1>create-react-app</h1>
        <h2>New homepage</h2>
        {flags.newHomepage ? "New variant" : "Old variant"}
      </div>

      <footer>{flags.newFooter ? "New footer" : "Old footer"}</footer>
    </main>
  );
};

export const AnonymousPage = () => {
  const progressivelyProps = {
    clientKey: "e2d4c6b5-ca7c-4c54-8d37-c74b9608312f",
    websocketUrl: "ws://localhost:4000",
    apiUrl: "http://localhost:4000",
  };

  return (
    <ProgressivelyProvider {...progressivelyProps}>
      <FlaggedComponent />
    </ProgressivelyProvider>
  );
};
