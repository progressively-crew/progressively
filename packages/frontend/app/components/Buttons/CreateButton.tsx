import { Button, ButtonProps } from "./Button";
import { IoMdCreate } from "react-icons/io";
import { styled } from "~/stitches.config";

const Wrapper = styled("span", {
  display: "flex",
  alignItems: "center",
  "& svg": {
    marginRight: "$spacing$2",
  },
});

export const CreateButton = ({ children, ...props }: ButtonProps) => {
  return (
    <Button {...props}>
      <Wrapper>
        <IoMdCreate aria-hidden />

        {children}
      </Wrapper>
    </Button>
  );
};
