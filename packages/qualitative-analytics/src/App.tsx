import React from "react";
import { useState, useEffect } from "react";
import { getClusterPoints } from "./getClusterPoints";

export const App = () => {
  const [i, setI] = useState(0);
  useEffect(() => {
    getClusterPoints("1", 30);
  }, []);
  return <button onClick={() => setI((x) => x + 1)}>{i}</button>;
};
