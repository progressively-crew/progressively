import { Button, ButtonProps } from "./Button";
import { BsCheck } from "react-icons/bs";
import { styled } from "~/stitches.config";

const Wrapper = styled("span", {
  display: "flex",
  alignItems: "center",
  "& svg": {
    marginRight: "$spacing$2",
  },
});

export const SubmitButton = ({ children, ...props }: ButtonProps) => {
  return (
    <Button type="submit" {...props}>
      <Wrapper>
        <BsCheck aria-hidden />

        {children}
      </Wrapper>
    </Button>
  );
};
