import { Container, Flex } from "@chakra-ui/react";
import { Logo } from "~/components/Logo";

export interface NotAuthenticatedLayoutProps {
  children: React.ReactNode;
}
export const NotAuthenticatedLayout = ({
  children,
}: NotAuthenticatedLayoutProps) => {
  return (
    <div>
      <Container maxW="md">
        <Flex
          p={3}
          as={"nav"}
          aria-label="General"
          justifyContent={"space-between"}
          alignItems="center"
        >
          <Logo to="/" />
        </Flex>
      </Container>

      <Container maxW="md" pt={16} pb={4}>
        {children}
      </Container>
    </div>
  );
};
