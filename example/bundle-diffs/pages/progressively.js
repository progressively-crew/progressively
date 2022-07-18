import React from "react";
import { ProgressivelyProvider, useFlags } from "@progressively/react";

const FlaggedComponent = () => {
  const { flags } = useFlags();

  if (flags.newHomepage) return <p>New homepage</p>;
  return <p>Old homepage</p>;
};

function Progressively() {
  return (
    <ProgressivelyProvider clientKey={"CLIENT_KEY"}>
      <FlaggedComponent />
    </ProgressivelyProvider>
  );
}

export default Progressively;
