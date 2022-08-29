import { useContext } from "react";
import { EnvContext } from "./EnvContext";

export const useEnvironment = () => useContext(EnvContext);
