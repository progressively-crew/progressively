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
        <div className="border-b border-b-color-gray-500 bg-white">
          <Container>
            <div className="flex justify-between h-14 items-center">
              <BreadCrumbs crumbs={crumbs} />

              <UseDropdown user={user} />
            </div>

            <HideDesktop>
              {header && <Spacer size={2} />}

              {header}
            </HideDesktop>
          </Container>
        </div>

        <InertWhenNavOpened>
          <Spacer size={8} />

          {subNav && <HideDesktop>{subNav}</HideDesktop>}

          <Spacer size={8} />

          <Container>
            <div
              className={
                subNav
                  ? "grid grid-cols-[1fr] md:grid-cols-[240px_1fr] gap-12"
                  : "grid-cols-[1fr]"
              }
            >
              {subNav && <HideTablet>{subNav}</HideTablet>}

              <div className="overflow-hidden">
                <Main>
                  <Stack spacing={6}>
                    {status}

                    {children}
                  </Stack>
                </Main>
              </div>
            </div>
          </Container>
        </InertWhenNavOpened>

        <Spacer size={10} />
      </div>
    </NavProvider>
  );
};
