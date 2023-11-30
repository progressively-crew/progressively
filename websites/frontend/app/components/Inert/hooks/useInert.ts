import { useContext } from "react";
import { InertContext } from "../context/InertContext";

export const useInert = () => useContext(InertContext);
