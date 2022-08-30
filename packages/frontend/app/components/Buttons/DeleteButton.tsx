import { FiTrash } from "react-icons/fi";
import { Button, ButtonProps } from "./Button";

export const DeleteButton = ({ children, ...props }: ButtonProps) => {
  return (
    <Button
      variant="secondary"
      scheme="danger"
      icon={<FiTrash aria-hidden />}
      {...props}
    >
      {children}
    </Button>
  );
};
