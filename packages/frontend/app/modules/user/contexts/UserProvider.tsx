import { User } from "../types";
import { UserContext } from "./UserContext";

export interface UserProviderProps {
  children: React.ReactNode;
  user: User;
}

export const UserProvider = ({ children, user }: UserProviderProps) => {
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};
