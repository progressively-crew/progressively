import { Container } from "~/components/Container";
import { Main } from "~/components/Main";

export interface ErrorLayoutProps {
  children: React.ReactNode;
}
export function ErrorLayout({ children }: ErrorLayoutProps) {
  return (
    <Container>
      <Main>{children}</Main>
    </Container>
  );
}
