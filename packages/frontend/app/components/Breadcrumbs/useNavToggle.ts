import { useContext } from "react";
import { NavContext } from "./NavContext";

export const useNavToggle = () => useContext(NavContext);
