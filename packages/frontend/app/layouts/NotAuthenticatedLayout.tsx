import { Container } from "~/components/Container";
import { Main } from "~/components/Main";
import { Menu } from "~/components/Menu";
import { Nav } from "~/components/Nav";
import { Spacer } from "~/components/Spacer";
import { Stack } from "~/components/Stack";

export interface NotAuthenticatedLayoutProps {
  children: React.ReactNode;
  nav?: React.ReactNode;
  header?: React.ReactNode;
  status?: React.ReactNode;
}

export const NotAuthenticatedLayout = ({
  children,
  nav,
  header,
  status,
}: NotAuthenticatedLayoutProps) => {
  return (
    <div>
      <Nav aria-label="General">
        <Menu to="/" hideOnMobile />
      </Nav>

      <Spacer size={5} />

      <Main>
        <Container>
          <div>
            <Stack>
              {nav}
              <Stack>
                {header}
                {status && <Stack>{status}</Stack>}
              </Stack>
              {children}
            </Stack>
          </div>
        </Container>
      </Main>
    </div>
  );
};
