import { Main } from "~/components/Main";
import { User } from "~/modules/user/types";
import { SkipNavLink } from "~/components/SkipNav";
import { Container } from "~/components/Container";
import { Spacer } from "~/components/Spacer";
import { NavProvider } from "~/components/Breadcrumbs/providers/NavProvider";
import { InertWhenNavOpened } from "~/components/Breadcrumbs/InertWhenNavOpened";
import { styled } from "~/stitches.config";
import { HStack } from "~/components/HStack";
import { NavTree } from "~/modules/misc/components/NavTree";
import { TreeToggle } from "~/modules/misc/components/TreeToggle";
import { DarkLogo } from "~/components/Logo/DarkLogo";
import { UseDropdown } from "~/modules/user/components/UserDropdown";
import { Stack } from "~/components/Stack";

export interface DashboardLayoutProps {
  user?: Partial<User>;
  children: React.ReactNode;
  breadcrumb?: React.ReactNode;
  header?: React.ReactNode;
  subNav?: React.ReactNode;
  status?: React.ReactNode;
}

const OverflowContainer = styled("div", {
  overflow: "hidden", // scroll inside table elements,
  padding: "$spacing$3", // show box shadow when overflowing,
  margin: "-$spacing$3",

  "@tablet": {
    marginTop: "$spacing$3",
  },
});

const AppBar = styled("div", {
  background: "$hades",

  "& .logo": {
    height: "$ctaSmall",
    width: "$ctaSmall",
    marginRight: "$spacing$4",
  },
});

export const DashboardLayout = ({
  user,
  children,
  breadcrumb,
  header,
  subNav,
  status,
}: DashboardLayoutProps) => {
  return (
    <NavProvider>
      <InertWhenNavOpened>
        <SkipNavLink>Skip to content</SkipNavLink>

        <div>
          <AppBar>
            <Container>
              <HStack
                height="navHeight"
                justifyContent="space-between"
                as="nav"
                aria-label="General navigation"
              >
                <DarkLogo />
                <HStack spacing={4}>
                  <TreeToggle />
                  <UseDropdown user={user} />
                </HStack>
              </HStack>
            </Container>
          </AppBar>

          <Container>
            <Stack spacing={4}>
              {breadcrumb}
              <header>{header}</header>
            </Stack>
          </Container>

          <Container>{subNav}</Container>

          <Spacer size={12} />

          <Main>
            <Container>
              <OverflowContainer>
                <Stack spacing={8}>
                  {status}

                  {children}
                </Stack>
              </OverflowContainer>
            </Container>
          </Main>
        </div>
      </InertWhenNavOpened>

      <NavTree />
    </NavProvider>
  );
};
