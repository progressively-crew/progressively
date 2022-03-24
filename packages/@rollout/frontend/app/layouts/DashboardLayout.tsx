import { Container, Flex } from "@chakra-ui/react";
import { Logo } from "~/components/Logo";
import { User } from "~/modules/user/types";
import { UseDropdown } from "~/modules/user/UserDropdown";

export interface DashboardLayoutProps {
  user: User;
  children: React.ReactNode;
}

export const DashboardLayout = ({ user, children }: DashboardLayoutProps) => {
  return (
    <div>
      <Container maxW="3xl">
        <Flex
          py={3}
          as={"nav"}
          aria-label="General navigation"
          justifyContent={"space-between"}
          alignItems="center"
        >
          <Logo />

          <UseDropdown user={user} />
        </Flex>
      </Container>

      <Container maxW="3xl" pt={16} pb={4}>
        {children}
      </Container>
    </div>
  );
};
