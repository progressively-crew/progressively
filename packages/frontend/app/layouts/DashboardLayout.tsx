import { Main } from "~/components/Main";
import { User } from "~/modules/user/types";
import { SkipNavLink } from "~/components/SkipNav";
import { Container } from "~/components/Container";
import { Spacer } from "~/components/Spacer";
import { NavProvider } from "~/components/Breadcrumbs/providers/NavProvider";
import { InertWhenNavOpened } from "~/components/Breadcrumbs/InertWhenNavOpened";
import { styled } from "~/stitches.config";
import { Stack } from "~/components/Stack";
import { LogoWithoutText } from "~/components/Logo/WithoutText";
import { HStack } from "~/components/HStack";
import { NavTree } from "~/modules/misc/components/NavTree";
import { TreeToggle } from "~/modules/misc/components/TreeToggle";

export interface DashboardLayoutProps {
  user?: Partial<User>;
  children: React.ReactNode;
  breadcrumb?: React.ReactNode;
  header: React.ReactNode;
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

const BreadCrumbWrapper = styled("div", {
  background: "$apollo",

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
            <Stack spacing={4}>
              <BreadCrumbWrapper>
                <Container>
                  <HStack height="cta">
                    <TreeToggle label="Toggle tree navigation">
                      <LogoWithoutText />
                    </TreeToggle>

                    {breadcrumb}
                  </HStack>
                </Container>
              </BreadCrumbWrapper>

              <div>
                <Container>
                  {!breadcrumb && <Spacer size={4} />}
                  <header>{header}</header>
                </Container>
              </div>

              {subNav}
            </Stack>

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
