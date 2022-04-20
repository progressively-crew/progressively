import React from "react";
import ReactDOM from "react-dom/client";
import { ProgressivelyProvider, useFlags } from "@progressively/react";

const FlaggedComponent = () => {
  const { flags } = useFlags();

  if (flags.newHomepage) {
    return <div style={{ background: "red", color: "white" }}>New variant</div>;
  }

  return <div style={{ background: "lightblue" }}>Old variant</div>;
};

const Home = () => {
  return (
    <ProgressivelyProvider clientKey="valid-sdk-key">
      <main>
        <FlaggedComponent />
      </main>
    </ProgressivelyProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);
