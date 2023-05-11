import { IsSaasContext } from "./IsSaasContext";

export interface IsSaasProviderProps {
  children: React.ReactNode;
  isSaas: boolean;
}

export const IsSaasProvider = ({ children, isSaas }: IsSaasProviderProps) => {
  return (
    <IsSaasContext.Provider value={isSaas}>{children}</IsSaasContext.Provider>
  );
};
