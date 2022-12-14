import { BsSun } from "react-icons/bs";
import { FiMoon } from "react-icons/fi";
import { useTheme } from "~/modules/theme/useTheme";
import { Typography } from "./Typography";

export const ThemeSwitch = () => {
  const { theme, toggleTheme } = useTheme();

  if (!theme) return null;

  const checked = theme === "dark";

  const thumnailCheckedClasses = checked
    ? "translate-x-full text-slate-900 bg-slate-200"
    : "text-orange-400 bg-white";

  const wrapperCheckedClasses = checked ? "bg-slate-900" : "bg-orange-200";
  const thumnailTransitionClasses = checked ? "group-active:-ml-4" : "";

  return (
    <button
      aria-checked={checked}
      type="button"
      role="switch"
      aria-label={"Toggle theme"}
      onClick={toggleTheme}
      className="h-10 px-1 flex items-center gap-2 group"
    >
      <Typography as="span" className={`text-xs`}>
        {"Light"}
      </Typography>
      <span
        className={
          "transition-all ease-in-out duration-200 h-7 w-12 rounded-full inline-block p-1 " +
          wrapperCheckedClasses
        }
      >
        <span
          aria-hidden
          className={
            "transition-all ease-in-out duration-100 w-5 h-full block rounded-full group-active:w-7 flex items-center justify-center " +
            thumnailCheckedClasses +
            " " +
            thumnailTransitionClasses
          }
        >
          {checked ? <FiMoon /> : <BsSun />}
        </span>
      </span>
      <Typography as="span" className="text-xs">
        {"Dark"}
      </Typography>
    </button>
  );
};
