import { useContext } from "react";
import { StrategyContext } from "./StrategyContext";

export const useStrategy = () => useContext(StrategyContext);
