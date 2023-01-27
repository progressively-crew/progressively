import { Button, ButtonProps } from "./Button";
import { AiOutlinePlus } from "react-icons/ai";

export const CreateButton = ({ children, ...props }: ButtonProps) => {
  return (
    <Button variant="primary" icon={<AiOutlinePlus aria-hidden />} {...props}>
      {children}
    </Button>
  );
};
