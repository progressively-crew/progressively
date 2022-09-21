import { useEffect, useState } from "react";
import { useNavToggle } from "~/components/Breadcrumbs/hooks/useNavToggle";
import { Button } from "~/components/Buttons/Button";
import { HStack } from "~/components/HStack";
import { Kbd } from "~/components/Kbd";

export const TreeToggle = () => {
  const { toggleNav, isNavOpened } = useNavToggle();
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && e.metaKey) {
        e.preventDefault();
        setIsPressed(true);
        toggleNav();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [toggleNav]);

  useEffect(() => {
    if (!isNavOpened) {
      setIsPressed(false);
    }
  }, [isNavOpened]);

  return (
    <Button
      onClick={toggleNav}
      icon={
        <HStack spacing={1}>
          <Kbd isPressed={isPressed}>⌘</Kbd>
          <Kbd isPressed={isPressed}>K</Kbd>
        </HStack>
      }
      variant="tertiary"
      scheme="inverse"
    >
      Navigate
    </Button>
  );
};
