import { Container, Flex } from "@chakra-ui/react";
import { SkipNavLink } from "@chakra-ui/skip-nav";
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
      <SkipNavLink>Skip to content</SkipNavLink>
      <Container maxW="5xl">
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

      <Container maxW="5xl" pt={[0, 16]} pb={4}>
        {children}
      </Container>
    </div>
  );
};
