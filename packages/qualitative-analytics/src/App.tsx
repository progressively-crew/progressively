import React from "react";
import { useState } from "react";

export const App = () => {
  const [i, setI] = useState(0);
  return <button onClick={() => setI((x) => x + 1)}>{i}</button>;
};
