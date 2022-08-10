import { styled } from "~/stitches.config";
import { Container } from "./Container";
import { HStack } from "./HStack";

const NavWrapper = styled("nav", {
  padding: "$spacing$4 0",
  background: "$hades",

  "@mobile": {
    padding: "$spacing$4",
  },
});

export interface NavProps {
  children: React.ReactNode;
}

export const Nav = ({ children }: NavProps) => {
  return (
    <NavWrapper>
      <Container>
        <HStack justifyContent="space-between">{children}</HStack>
      </Container>
    </NavWrapper>
  );
};
