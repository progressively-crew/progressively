import { Button, ButtonProps } from "./Button";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";

export const SwitchButton = ({ children, ...props }: ButtonProps) => {
  return (
    <Button
      variant="ghost"
      icon={<HiOutlineSwitchHorizontal aria-hidden />}
      {...props}
    >
      {children}
    </Button>
  );
};
