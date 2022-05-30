import { Button, ButtonProps } from "./Button";
import { IoMdCreate } from "react-icons/io";

export const CreateButton = ({ children, ...props }: ButtonProps) => {
  return (
    <Button icon={<IoMdCreate aria-hidden />} {...props}>
      {children}
    </Button>
  );
};
