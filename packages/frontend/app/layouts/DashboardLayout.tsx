import { Main } from "~/components/Main";
import { User } from "~/modules/user/types";
import { SkipNavLink } from "~/components/SkipNav";
import { Container } from "~/components/Container";
import { Spacer } from "~/components/Spacer";
import { NavProvider } from "~/components/Breadcrumbs/providers/NavProvider";
import { InertWhenNavOpened } from "~/components/Breadcrumbs/InertWhenNavOpened";
import { styled } from "~/stitches.config";
import { Stack } from "~/components/Stack";

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
      </InertWhenNavOpened>

      <PageWrapper>
        <div>
          <Stack spacing={4}>
            {breadcrumb && (
              <div>
                <BreadCrumbWrapper>
                  <Container>{breadcrumb}</Container>
                </BreadCrumbWrapper>
              </div>
            )}

            <div>
              <Container>
                {!breadcrumb && <Spacer size={4} />}
                <header>{header}</header>
              </Container>
            </div>

            {subNav}
          </Stack>

          <Spacer size={12} />
          <InertWhenNavOpened>
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
          </InertWhenNavOpened>
        </div>
      </PageWrapper>
    </NavProvider>
  );
};
