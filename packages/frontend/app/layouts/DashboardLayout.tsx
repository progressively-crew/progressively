import { Main } from "~/components/Main";
import { User } from "~/modules/user/types";
import { SkipNavLink } from "~/components/SkipNav";
import { Container } from "~/components/Container";
import { Spacer } from "~/components/Spacer";
import { NavProvider } from "~/components/Breadcrumbs/providers/NavProvider";
import { InertWhenNavOpened } from "~/components/Breadcrumbs/InertWhenNavOpened";
import { styled } from "~/stitches.config";

export interface DashboardLayoutProps {
  user?: Partial<User>;
  children: React.ReactNode;
  breadcrumb?: React.ReactNode;
  header: React.ReactNode;
  subNav?: React.ReactNode;
  status?: React.ReactNode;
}

const EndSection = styled("div", {
  overflow: "hidden", // scroll inside table elements,
  padding: "$spacing$1", // show box shadow when overflowing,
  margin: "-$spacing$1",
});

const HeaderWrapper = styled("div", {
  background: "$apollo",

  variants: {
    hasBreadcrumbs: {
      true: { padding: "$spacing$4 0 $spacing$10 0" },
      false: { padding: "$spacing$10 0 $spacing$10 0" },
    },
  },
});

const SubNavWrapper = styled("div", {
  background: "$nemesisLight",
});

export const DashboardLayout = ({
  children,
  breadcrumb,
  header,
  subNav,
  status,
}: DashboardLayoutProps) => {
  return (
    <NavProvider>
      <div>
        <InertWhenNavOpened>
          <SkipNavLink>Skip to content</SkipNavLink>
        </InertWhenNavOpened>

        <HeaderWrapper hasBreadcrumbs={Boolean(breadcrumb)}>
          {breadcrumb && (
            <Container>
              {breadcrumb}
              <Spacer size={4} />
            </Container>
          )}

          <Container>
            <header>{header}</header>
          </Container>
        </HeaderWrapper>

        <InertWhenNavOpened>
          <Main>
            <SubNavWrapper>
              <Container>{subNav}</Container>
            </SubNavWrapper>

            <Container>
              <Spacer
                size={{
                  "@initial": 12,
                  "@tablet": 0,
                  "@mobile": 0,
                }}
              />

              <EndSection>
                {status && (
                  <>
                    {status}
                    <Spacer size={8} />
                  </>
                )}

                {children}
              </EndSection>
            </Container>
          </Main>
        </InertWhenNavOpened>
      </div>
    </NavProvider>
  );
};
