import { Button, ButtonProps } from "./Button";
import { AiOutlinePlus } from "react-icons/ai/index.js";

export const CreateButton = ({ children, ...props }: ButtonProps) => {
  return (
    <Button
      variant="primary"
      icon={<AiOutlinePlus aria-hidden />}
      className="w-full md:w-auto"
      {...props}
    >
      {children}
    </Button>
  );
};
