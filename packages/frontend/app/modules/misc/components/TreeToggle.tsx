import { useEffect } from "react";
import { TbSailboat } from "react-icons/tb";
import { useNavToggle } from "~/components/Breadcrumbs/hooks/useNavToggle";
import { Button } from "~/components/Buttons/Button";

export const TreeToggle = () => {
  const { toggleNav } = useNavToggle();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" && e.ctrlKey && e.altKey) {
        toggleNav();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [toggleNav]);

  return (
    <Button onClick={toggleNav} icon={<TbSailboat />} variant="tertiary" scheme="inverse">
      Navigate
    </Button>
  );
};
