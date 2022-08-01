import React from "react";
import { ProgressivelyProvider, useFlags } from "@progressively/react";

const FlaggedComponent = () => {
  const { flags } = useFlags();

  return (
    <main>
      <div>
        <h1>New homepage</h1>
        {flags.newHomepage ? "New variant" : "Old variant"}
      </div>

      <footer>{flags.newFooter ? "New footer" : "Old footer"}</footer>
    </main>
  );
};

export const AnonymousPage = () => {
  const progressivelyProps = {
    clientKey: "valid-sdk-key",
    websocketUrl: "ws://localhost:4000",
    apiUrl: "http://localhost:4000",
  };

  return (
    <ProgressivelyProvider {...progressivelyProps}>
      <FlaggedComponent />
    </ProgressivelyProvider>
  );
};
