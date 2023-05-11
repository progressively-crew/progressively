import { useContext } from "react";
import { IsSaasContext } from "./IsSaasContext";

export const useIsSaas = () => useContext(IsSaasContext);
