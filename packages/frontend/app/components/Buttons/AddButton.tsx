import { Button, ButtonProps } from "./Button";
import { IoMdAdd } from "react-icons/io";

export const AddButton = ({ children, ...props }: ButtonProps) => {
  return (
    <Button variant="ghost" icon={<IoMdAdd aria-hidden />} {...props}>
      {children}
    </Button>
  );
};
