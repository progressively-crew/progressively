import { Button, ButtonProps } from "./Button";
import { AiOutlineEdit } from "react-icons/ai";

export const EditButton = ({ children, ...props }: ButtonProps) => {
  return (
    <Button
      variant="primary"
      icon={<AiOutlineEdit aria-hidden />}
      className="w-full md:w-auto"
      {...props}
    >
      {children}
    </Button>
  );
};
