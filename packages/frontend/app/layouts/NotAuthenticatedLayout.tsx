import { Box, Container, Flex } from "@chakra-ui/react";
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
      <Box borderBottomWidth={1} borderBottomColor="text.100">
        <Container maxW="5xl">
          <Flex
            py={3}
            as={"nav"}
            aria-label="General"
            justifyContent={"space-between"}
            alignItems="center"
            h={"72px"}
          >
            <Logo to="/signin" />
          </Flex>
        </Container>
      </Box>

      <Container maxW="5xl">
        <Box maxW="65ch" pt={16} pb={4}>
          {nav && <Box pb={2}>{nav}</Box>}

          <Box pb={4}>{header}</Box>

          {children}
        </Box>
      </Container>
    </Main>
  );
};
