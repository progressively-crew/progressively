import { Box, Container, Flex } from "@chakra-ui/react";
import { SkipNavLink } from "@chakra-ui/skip-nav";
import { Logo } from "~/components/Logo";
import { Main } from "~/components/Main";
import { User } from "~/modules/user/types";
import { UseDropdown } from "~/modules/user/UserDropdown";

export interface DashboardLayoutProps {
  user: User;
  children: React.ReactNode;
  breadcrumb?: React.ReactNode;
  header: React.ReactNode;
  subNav?: React.ReactNode;
}

export const DashboardLayout = ({
  user,
  children,
  breadcrumb,
  header,
  subNav,
}: DashboardLayoutProps) => {
  return (
    <div>
      <SkipNavLink>Skip to content</SkipNavLink>
      <Container maxW="5xl">
        <Flex
          py={3}
          as={"nav"}
          aria-label="General"
          justifyContent={"space-between"}
          alignItems="center"
        >
          <Logo />

          <UseDropdown user={user} />
        </Flex>
      </Container>

      <Container maxW="5xl" pt={[0, 16]} pb={4}>
        {breadcrumb}

        <Main>
          <Box pb={[0, 8]}>{header}</Box>
          <Box pb={6}>{subNav}</Box>

          {children}
        </Main>
      </Container>
    </div>
  );
};
