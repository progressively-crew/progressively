import { TbSailboat } from "react-icons/tb";
import { useNavToggle } from "~/components/Breadcrumbs/hooks/useNavToggle";
import { Button } from "~/components/Buttons/Button";

export const TreeToggle = () => {
  const { toggleNav } = useNavToggle();

  return (
    <Button onClick={toggleNav} icon={<TbSailboat />} variant="tertiary" scheme="inverse">
      Navigate
    </Button>
  );
};
