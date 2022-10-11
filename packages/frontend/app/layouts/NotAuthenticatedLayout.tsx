import { Container } from "~/components/Container";
import { HStack } from "~/components/HStack";
import { DarkLogo } from "~/components/Logo/DarkLogo";
import { Main } from "~/components/Main";
import { Spacer } from "~/components/Spacer";
import { Stack } from "~/components/Stack";
import { styled } from "~/stitches.config";

export interface NotAuthenticatedLayoutProps {
  children: React.ReactNode;
  nav?: React.ReactNode;
  header?: React.ReactNode;
  status?: React.ReactNode;
}

const Nav = styled("nav", {
  background: "$hades",
});

export const NotAuthenticatedLayout = ({
  children,
  nav,
  header,
  status,
}: NotAuthenticatedLayoutProps) => {
  return (
    <div>
      <Nav aria-label="General">
        <HStack height="navHeight" justifyContent="center">
          <DarkLogo to={"/"} />
        </HStack>
      </Nav>

      <Spacer size={12} />

      <Main>
        <Container maxWidth={"thinContainer"}>
          {nav && <div>{nav}</div>}
          <Stack spacing={4}>
            <Stack spacing={2}>
              {header}
              {status && <Stack spacing={4}>{status}</Stack>}
            </Stack>
            {children}
          </Stack>
        </Container>
      </Main>
    </div>
  );
};
