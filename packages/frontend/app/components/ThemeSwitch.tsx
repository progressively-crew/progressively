import { useEffect, useState } from "react";
import { Switch } from "./Switch";

export const ThemeSwitch = () => {
  const [theme, setTheme] = useState<"dark" | "light" | undefined>();

  useEffect(() => {
    const isDark =
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    localStorage.theme = localStorage.theme === "dark" ? "light" : "dark";

    setTheme(localStorage.theme);
  };

  if (!theme) return null;

  return (
    <Switch
      label={`Switch theme`}
      type="button"
      onClick={toggleTheme}
      checked={theme === "dark"}
    />
  );
};
