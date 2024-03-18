import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";

const root = document.createElement("div");
root.id = "__progressively-qualititive-analytics";
document.body.appendChild(root);
ReactDOM.render(<App />, root);
