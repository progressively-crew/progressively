import React, { createContext, useContext, ReactNode } from "react";

export const AuthTokenContext = createContext<string>("");

export const useAuthToken = () => useContext(AuthTokenContext);

export const AuthTokenProvider = ({
  children,
  token,
}: {
  children: ReactNode;
  token: string;
}) => {
  return (
    <AuthTokenContext.Provider value={token}>
      {children}
    </AuthTokenContext.Provider>
  );
};
