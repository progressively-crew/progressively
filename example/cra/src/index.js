import React from "react";
import ReactDOM from "react-dom/client";
import { RolloutProvider, useFlags } from "@rollout/react";

const FlaggedComponent = () => {
  const { flags } = useFlags();

  if (flags.newHomepage) {
    return <div style={{ background: "red", color: "white" }}>New variant</div>;
  }

  return <div style={{ background: "lightblue" }}>Old variant</div>;
};

const Home = () => {
  return (
    <RolloutProvider clientKey="valid-sdk-key">
      <main>
        <FlaggedComponent />
      </main>
    </RolloutProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);
