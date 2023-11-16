import { useCallback, useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";

export interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<"dark" | "light" | undefined>();

  useEffect(() => {
    const isDark =
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = useCallback(() => {
    document?.documentElement?.classList.toggle("dark");
    localStorage.theme = localStorage.theme === "dark" ? "light" : "dark";

    setTheme(localStorage.theme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
