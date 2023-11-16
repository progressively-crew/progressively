import { Button, ButtonProps } from "./Button";
import { FiEdit } from "react-icons/fi/index.js";

export const SubmitButton = ({ children, ...props }: ButtonProps) => {
  return (
    <Button
      type="submit"
      variant="primary"
      icon={<FiEdit aria-hidden />}
      className="w-full md:w-auto"
      {...props}
    >
      {children}
    </Button>
  );
};
