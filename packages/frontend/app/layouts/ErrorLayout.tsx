import { Container } from "@chakra-ui/react";
import { Main } from "~/components/Main";

export interface ErrorLayoutProps {
  children: React.ReactNode;
}
export function ErrorLayout({ children }: ErrorLayoutProps) {
  return (
    <Container maxW="5xl">
      <Main>{children}</Main>
    </Container>
  );
}
