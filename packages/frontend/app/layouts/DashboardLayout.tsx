import { Container, Flex } from "@chakra-ui/react";
import { Logo } from "~/components/Logo";
import { Main } from "~/components/Main";
import { User } from "~/modules/user/types";
import { UseDropdown } from "~/modules/user/components/UserDropdown";
import { SkipNavLink } from "~/components/SkipNav";

export interface DashboardLayoutProps {
  user?: Partial<User>;
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
          h={"72px"}
        >
          <Logo />

          {user && user.fullname && <UseDropdown user={user as User} />}
        </Flex>
      </Container>

      <Container maxW="5xl" pt={[0, 6]}>
        {breadcrumb}
      </Container>

      <Main>
        <Container maxW="5xl" pt={4} pb={8}>
          {header}
        </Container>
        {subNav}

        <Container maxW="5xl">{children}</Container>
      </Main>
    </div>
  );
};
