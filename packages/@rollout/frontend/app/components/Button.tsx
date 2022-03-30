import {
  ButtonProps as CButtonProps,
  Button as CButton,
} from "@chakra-ui/react";
import { Link } from "remix";

export interface ButtonProps extends CButtonProps {
  to?: string;
}

export const Button = (props: ButtonProps) => {
  return <CButton as={props?.to ? Link : undefined} size={"lg"} {...props} />;
};
