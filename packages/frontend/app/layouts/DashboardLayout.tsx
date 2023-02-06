import { Main } from "~/components/Main";
import { User } from "~/modules/user/types";
import { SkipNavLink } from "~/components/SkipNav";
import { Container } from "~/components/Container";
import { Spacer } from "~/components/Spacer";
import { NavProvider } from "~/components/Breadcrumbs/providers/NavProvider";
import { InertWhenNavOpened } from "~/components/Breadcrumbs/InertWhenNavOpened";
import { UserDropdown } from "~/modules/user/components/UserDropdown";
import { useMatches } from "@remix-run/react";
import { BreadCrumbs } from "~/components/Breadcrumbs";

export interface DashboardLayoutProps {
  user: User;
  children: React.ReactNode;
  subNav?: React.ReactNode;
  status?: React.ReactNode;
}

export const DashboardLayout = ({
  user,
  children,
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

      <div className="bg-white dark:bg-slate-800">
        <Container>
          <div className="flex justify-between h-14 items-center">
            <BreadCrumbs crumbs={crumbs} />
            <UserDropdown user={user} />
          </div>
        </Container>
      </div>

      <div className="bg-white dark:bg-slate-800 lg:sticky top-0 border-b border-gray-200 dark:border-slate-700 z-10">
        <Container>{subNav}</Container>
      </div>

      <InertWhenNavOpened className="flex-1 px-4 md:px-12 h-full bg-gray-50 dark:bg-slate-900">
        <div>
          <div className={`max-w-5xl w-full mx-auto`}>
            <Spacer size={12} />

            <Main>
              <div className="flex flex-col gap-4 md:gap-6">
                {status}

                {children}
              </div>
            </Main>

            <Spacer size={10} />
          </div>
        </div>
      </InertWhenNavOpened>
    </NavProvider>
  );
};
