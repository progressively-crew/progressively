import { Main } from "~/components/Main";
import { User } from "~/modules/user/types";
import { SkipNavLink } from "~/components/SkipNav";
import { Container } from "~/components/Container";
import { Spacer } from "~/components/Spacer";
import { NavProvider } from "~/components/Breadcrumbs/providers/NavProvider";
import { InertWhenNavOpened } from "~/components/Breadcrumbs/InertWhenNavOpened";
import { HStack } from "~/components/HStack";
import { UseDropdown } from "~/modules/user/components/UserDropdown";
import { Stack } from "~/components/Stack";
import { useMatches } from "@remix-run/react";
import { BreadCrumbs } from "~/components/Breadcrumbs";
import { HideDesktop, HideTablet } from "~/components/HideMobile";

export interface DashboardLayoutProps {
  user?: Partial<User>;
  children: React.ReactNode;
  header?: React.ReactNode;
  subNav?: React.ReactNode;
  status?: React.ReactNode;
}

export const DashboardLayout = ({
  user,
  children,
  header,
  subNav,
  status,
}: DashboardLayoutProps) => {
  const matches = useMatches();

  const crumbs = matches
    .filter((match) => match.handle && match.handle.breadcrumb)
    .map((match) => match.handle.breadcrumb(match, matches));

  return (
    <NavProvider>
      <SkipNavLink>Skip to content</SkipNavLink>

      <div>
        <div>
          <Container>
            <HStack justifyContent="space-between" height="navHeight">
              <BreadCrumbs crumbs={crumbs} />

              <UseDropdown user={user} />
            </HStack>

            <HideDesktop>
              {header && <Spacer size={2} />}

              {header}
            </HideDesktop>
          </Container>
        </div>

        <InertWhenNavOpened>
          <Spacer size={{ "@initial": 8, "@tablet": 0 }} />

          {subNav && <HideDesktop>{subNav}</HideDesktop>}

          <Spacer size={{ "@initial": 0, "@tablet": 6 }} />

          <Container>
            <div>
              {subNav && <HideTablet>{subNav}</HideTablet>}

              <div className="overflow-hidden">
                <Main>
                  <Stack spacing={{ "@initial": 6, "@mobile": 4 }}>
                    {status}

                    {children}
                  </Stack>
                </Main>
              </div>
            </div>
          </Container>
        </InertWhenNavOpened>
      </div>
    </NavProvider>
  );
};
