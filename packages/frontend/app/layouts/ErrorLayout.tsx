import { Container } from "~/components/Container";
import { Main } from "~/components/Main";
import { styled } from "~/stitches.config";

export interface ErrorLayoutProps {
  children: React.ReactNode;
}

const Wrapper = styled("div", {
  padding: "$spacing$10 0",
});

export function ErrorLayout({ children }: ErrorLayoutProps) {
  return (
    <Wrapper>
      <Container>
        <Main>{children}</Main>
      </Container>
    </Wrapper>
  );
}
