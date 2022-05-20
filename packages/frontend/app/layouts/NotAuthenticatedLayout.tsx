import { Container } from "~/components/Container";
import { Logo } from "~/components/Logo";
import { Main } from "~/components/Main";

export interface NotAuthenticatedLayoutProps {
  children: React.ReactNode;
  nav?: React.ReactNode;
  header: React.ReactNode;
}
export const NotAuthenticatedLayout = ({
  children,
  nav,
  header,
}: NotAuthenticatedLayoutProps) => {
  return (
    <Main>
      <Container>
        <nav>
          <Logo to="/signin" />
        </nav>

        {nav}

        {header}

        {children}
      </Container>
    </Main>
  );
};
