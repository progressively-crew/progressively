import React from "react";
import { useState, useEffect } from "react";
import { AuthTokenProvider } from "./AuthTokenContext";
import { GridPoints } from "./GridPoints";

export const App = () => {
  const [authToken, setAuthToken] = useState<string>();

  useEffect(() => {
    const token = window.location.hash.split("#__progressively=")?.[1];

    if (token) {
      setAuthToken(token);
    }
  }, []);

  if (!authToken) return null;

  return (
    <AuthTokenProvider token={authToken}>
      <GridPoints />
    </AuthTokenProvider>
  );
};
