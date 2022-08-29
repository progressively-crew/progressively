import { useContext } from "react";
import { FlagEnvContext } from "./FlagEnvContext";

export const useFlagEnv = () => useContext(FlagEnvContext);
