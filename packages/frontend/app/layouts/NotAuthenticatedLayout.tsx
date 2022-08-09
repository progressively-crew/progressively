import { Container } from "~/components/Container";
import { DarkLogo } from "~/components/Logo/DarkLogo";
import { Main } from "~/components/Main";
import { Nav } from "~/components/Nav";
import { Spacer } from "~/components/Spacer";
import { Stack } from "~/components/Stack";
import { styled } from "~/stitches.config";

export interface NotAuthenticatedLayoutProps {
  children: React.ReactNode;
  nav?: React.ReactNode;
  header?: React.ReactNode;
  status?: React.ReactNode;
}

const Wrapper = styled("div", {
  padding: "$spacing$10 0",
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
        <DarkLogo to={"/"} />
      </Nav>

      <Spacer size={5} />
      <Main>
        <Container>
          <Wrapper>
            {nav && <div>{nav}</div>}
            <Stack spacing={4}>
              <Stack spacing={2}>
                {header}
                {status && <Stack spacing={4}>{status}</Stack>}
              </Stack>
              {children}
            </Stack>
          </Wrapper>
        </Container>
      </Main>
    </div>
  );
};
