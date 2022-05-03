import { Box, Container, Flex } from "@chakra-ui/react";
import { Logo } from "~/components/Logo";

export interface NotAuthenticatedLayoutProps {
  children: React.ReactNode;
}
export const NotAuthenticatedLayout = ({
  children,
}: NotAuthenticatedLayoutProps) => {
  return (
    <div>
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
            <Logo to="/" />
          </Flex>
        </Container>
      </Box>

      <Container maxW="5xl">
        <Box maxW="65ch" pt={16} pb={4}>
          {children}
        </Box>
      </Container>
    </div>
  );
};
