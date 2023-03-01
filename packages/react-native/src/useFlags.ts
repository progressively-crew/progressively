import { useContext } from "react";
import { ProgressivelyContext } from "./ProgressivelyContext";

export const useFlags = () => useContext(ProgressivelyContext);
