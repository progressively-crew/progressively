import { HStack } from "../HStack";
import { Link } from "../Link";
import { Logo } from "../Logo/Logo";
import { MenuButton } from "../MenuButton";
import { CrumbIcon } from "./CrumbIcon";
import { Crumbs } from "./types";

export interface DesktopNavProps {
  crumbs: Crumbs;
}

export const DesktopNav = ({ crumbs }: DesktopNavProps) => {
  const lastItemIndex = crumbs.length - 1;

  return (
    <nav aria-label="Breadcrumbs">
      <ol className="flex h-12 items-center">
        {crumbs.map((crumb, index) => {
          const currentPage = index === lastItemIndex;

          return (
            <li
              key={crumb.link}
              className={
                "flex items-center last-of-type:text-indigo-700 last-of-type:font-bold"
              }
            >
              <Link
                aria-current={currentPage ? "page" : undefined}
                to={crumb.link}
                className={`transition-all px-2 py-1 rounded hover:text-black hover:dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700 active:bg-gray-200 dark:active:bg-slate-600 active:text-indigo-700 no-underline text-sm ${
                  currentPage
                    ? "text-black dark:text-slate-100"
                    : "text-gray-500 dark:text-slate-400"
                }`}
              >
                <div className={"rounded px-2 py-1"}>
                  <HStack spacing={2}>
                    {crumb.isRoot ? (
                      <Logo aria-label={crumb.label} />
                    ) : (
                      <>
                        <CrumbIcon
                          crumb={crumb}
                          color={
                            currentPage
                              ? "text-indigo-700 dark:text-indigo-400"
                              : ""
                          }
                        />
                        {crumb.label}
                      </>
                    )}
                  </HStack>
                </div>
              </Link>

              {crumb.menuItems ? (
                <MenuButton items={crumb.menuItems} label={crumb.menuLabel!} />
              ) : null}

              {!currentPage && (
                <div
                  className="flex text-gray-200 dark:text-slate-500 px-4"
                  aria-hidden
                >
                  <div
                    className="h-6 bg-gray-200 dark:bg-slate-700 w-[2px]"
                    style={{ transform: "rotateZ(30deg)" }}
                  />
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
