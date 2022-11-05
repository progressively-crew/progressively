import { AiOutlineMenu } from "react-icons/ai";
import { VisuallyHidden } from "../VisuallyHidden";
import { useNavToggle } from "./hooks/useNavToggle";

export const NavToggle = () => {
  const { toggleNav, isNavOpened } = useNavToggle();

  return (
    <button
      onClick={toggleNav}
      tabIndex={isNavOpened ? -1 : 0}
      aria-hidden={isNavOpened}
    >
      <AiOutlineMenu />
      <VisuallyHidden>Toggle menu</VisuallyHidden>
    </button>
  );
};
