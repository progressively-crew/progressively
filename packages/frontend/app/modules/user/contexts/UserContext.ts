import { createContext } from "react";
import { User } from "../types";

export interface UserContextType {
  user: User;
}

export const UserContext = createContext<UserContextType>({});
