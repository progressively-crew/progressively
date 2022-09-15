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

const PageWrapper = styled("div", {});

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

        <PageWrapper>
          <div>
            <AppBar>
              <Container>
                <HStack height="navHeight" justifyContent="space-between">
                  <DarkLogo />
                  <HStack spacing={4}>
                    <TreeToggle />
                    <UseDropdown user={user} />
                  </HStack>
                </HStack>
              </Container>
            </AppBar>

            <div>
              <Container>
                {breadcrumb}
                <Spacer size={4} />
                <header>{header}</header>
              </Container>
            </div>

            {subNav}

            <Spacer size={12} />

            <Main>
              <Container>
                <OverflowContainer>
                  {status && (
                    <>
                      {status}
                      <Spacer size={8} />
                    </>
                  )}

                  {children}
                </OverflowContainer>
              </Container>
            </Main>
          </div>
        </PageWrapper>
      </InertWhenNavOpened>

      <NavTree />
    </NavProvider>
  );
};
