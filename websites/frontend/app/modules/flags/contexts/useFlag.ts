import { useContext } from "react";
import { FlagContext } from "./FlagContext";

export const useFlag = () => useContext(FlagContext);
