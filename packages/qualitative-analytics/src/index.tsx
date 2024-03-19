import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";

const scriptEl = window.document.currentScript;
const endpoint = scriptEl?.getAttribute("data-progressively-endpoint");

if (!endpoint) {
  throw new Error(
    "[Progressively]: [data-progressively-endpoint] attributes should be set on the script tag."
  );
}

(window as any).__progressivelyEndpoint = endpoint;

const root = document.createElement("div");
root.id = "__progressively-qualititive-analytics";
document.body.appendChild(root);
ReactDOM.render(<App />, root);
