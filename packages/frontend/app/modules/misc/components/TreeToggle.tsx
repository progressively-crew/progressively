import { FaTree } from "react-icons/fa";
import { useNavToggle } from "~/components/Breadcrumbs/hooks/useNavToggle";
import { Button } from "~/components/Buttons/Button";

export const TreeToggle = () => {
  const { toggleNav } = useNavToggle();

  return (
    <Button onClick={toggleNav} icon={<FaTree />} variant="tertiary" scheme="inverse">
      Browse
    </Button>
  );
};
