import { FiTrash } from "react-icons/fi/index.js";
import { Button, ButtonProps } from "./Button";

export const DeleteButton = ({ children, ...props }: ButtonProps) => {
  return (
    <Button
      scheme="danger"
      icon={<FiTrash aria-hidden />}
      className="w-full md:w-auto"
      {...props}
    >
      {children}
    </Button>
  );
};
