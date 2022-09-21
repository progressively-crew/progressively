import { useEffect } from "react";
import { useNavToggle } from "~/components/Breadcrumbs/hooks/useNavToggle";
import { Button } from "~/components/Buttons/Button";
import { HStack } from "~/components/HStack";
import { Kbd } from "~/components/Kbd";

export const TreeToggle = () => {
  const { toggleNav } = useNavToggle();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && e.metaKey) {
        e.preventDefault();
        toggleNav();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [toggleNav]);

  return (
    <Button
      onClick={toggleNav}
      icon={
        <HStack spacing={1}>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </HStack>
      }
      variant="tertiary"
      scheme="inverse"
    >
      Navigate
    </Button>
  );
};
