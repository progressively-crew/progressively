import { AiOutlineMenu } from "react-icons/ai";
import { VisuallyHidden } from "../VisuallyHidden";
import { useNavToggle } from "./hooks/useNavToggle";

export const NavToggle = () => {
  const { toggleNav, isNavOpened } = useNavToggle();

  return (
    <button
      className="h-10 w-10 text-2xl dark:text-slate-300"
      onClick={toggleNav}
      tabIndex={isNavOpened ? -1 : 0}
      aria-hidden={isNavOpened}
    >
      <AiOutlineMenu />
      <VisuallyHidden>Toggle menu</VisuallyHidden>
    </button>
  );
};
