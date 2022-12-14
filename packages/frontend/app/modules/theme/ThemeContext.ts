import { createContext } from "react";

interface ThemeContextType {
  theme: "dark" | "light" | undefined;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
});
