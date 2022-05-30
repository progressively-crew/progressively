import { Button, ButtonProps } from "./Button";
import { FiEdit } from "react-icons/fi";

export const SubmitButton = ({ children, ...props }: ButtonProps) => {
  return (
    <Button
      type="submit"
      variant="success"
      icon={<FiEdit aria-hidden />}
      {...props}
    >
      {children}
    </Button>
  );
};
