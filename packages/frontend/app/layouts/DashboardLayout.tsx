import { Main } from "~/components/Main";
import { SkipNavLink } from "~/components/SkipNav";
import { Spacer } from "~/components/Spacer";
import { NavProvider } from "~/components/Breadcrumbs/providers/NavProvider";
import { InertWhenNavOpened } from "~/components/Breadcrumbs/InertWhenNavOpened";
import { useMatches, useNavigation } from "@remix-run/react";
import { BreadCrumbs } from "~/components/Breadcrumbs";
import { Spinner } from "~/components/Spinner";

export interface DashboardLayoutProps {
  children: React.ReactNode;
  subNav?: React.ReactNode;
  status?: React.ReactNode;
}

export const DashboardLayout = ({
  children,
  subNav,
  status,
}: DashboardLayoutProps) => {
  const navigation = useNavigation();
  const matches = useMatches();

  const crumbs = matches
    .filter((match) => match.handle && match.handle.breadcrumb)
    .map((match) => match.handle.breadcrumb(match, matches));

  const isNormalLoad =
    navigation.state === "loading" && navigation.formData == null;

  const gridClass = subNav
    ? "md:grid grid-cols-[auto_1fr] items-start h-full"
    : "";

  return (
    <NavProvider>
      <SkipNavLink>Skip to content</SkipNavLink>

      <div className="bg-gray-50 dark:bg-slate-900 h-full flex-1">
        {crumbs.length > 1 && (
          <div className="py-1 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 hidden md:block ">
            <div className="px-4">
              <BreadCrumbs crumbs={crumbs} />
            </div>
          </div>
        )}

        <div className={gridClass}>
          {subNav && (
            <div className="md:sticky left-0 top-0 md:w-[300px] md:border-r border-slate-200 dark:border-slate-800 md:h-screen bg-white">
              {subNav}
            </div>
          )}

          <InertWhenNavOpened className="h-full dark:bg-slate-900 flex-1 max-w-7xl mx-auto px-4 md:px-20 pt-8 md:pt-0 w-full">
            <Main>
              {status}
              <div className="flex-1">
                <div>
                  <div className="md:h-12" />

                  <div className="flex flex-col gap-4 md:gap-6">{children}</div>

                  <Spacer size={10} />
                </div>

                {isNormalLoad && (
                  <div
                    className="fixed left-4 bottom-4 animate-opacity-appearing"
                    style={{
                      animationDelay: "300ms",
                      opacity: 0,
                    }}
                  >
                    <Spinner className="text-3xl text-gray-400" />
                  </div>
                )}
              </div>
            </Main>
          </InertWhenNavOpened>
        </div>
      </div>
    </NavProvider>
  );
};
