import { useContext } from "react";
import { NavContext } from "../context/NavContext";

export const useNavToggle = () => useContext(NavContext);
