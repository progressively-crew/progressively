import { Main } from "~/components/Main";
import { User } from "~/modules/user/types";
import { SkipNavLink } from "~/components/SkipNav";
import { Container } from "~/components/Container";
import { Spacer } from "~/components/Spacer";
import { NavProvider } from "~/components/Breadcrumbs/providers/NavProvider";
import { InertWhenNavOpened } from "~/components/Breadcrumbs/InertWhenNavOpened";
import { UseDropdown } from "~/modules/user/components/UserDropdown";
import { useMatches } from "@remix-run/react";
import { BreadCrumbs } from "~/components/Breadcrumbs";

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

      <div className="bg-white border-gray-100 dark:bg-slate-800 dark:border-slate-700 border-b z-10 lg:sticky top-0 drop-shadow-xl">
        <Container>
          <div className="flex justify-between h-14 items-center">
            <BreadCrumbs crumbs={crumbs} />
            <UseDropdown user={user} />
          </div>

          {subNav}
        </Container>
      </div>

      <InertWhenNavOpened className="h-full">
        <div className="px-4 md:px-12 h-full">
          <div>
            <div className={`max-w-6xl w-full mx-auto`}>
              {header && (
                <div>
                  <Spacer size={12} />
                  {header}
                  <Spacer size={4} />
                </div>
              )}

              <Spacer size={8} />

              <Main>
                <div className="flex flex-col gap-2 md:gap-6">
                  {status}

                  {children}
                </div>
              </Main>

              <Spacer size={10} />
            </div>
          </div>
        </div>
      </InertWhenNavOpened>
    </NavProvider>
  );
};
