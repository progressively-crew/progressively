import { HStack } from "../HStack";
import { Link } from "../Link";
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
      <ol className="flex h-10 items-center">
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
                className="transition-all rounded p-2 -m-2 hover:text-black hover:bg-gray-100 active:bg-gray-200 active:text-indigo-700 no-underline text-sm"
              >
                <HStack spacing={2}>
                  <CrumbIcon crumb={crumb} />
                  {crumb.label}
                </HStack>
              </Link>

              {crumb.menuItems ? (
                <div className="pl-2">
                  <MenuButton items={crumb.menuItems} />
                </div>
              ) : null}

              {!currentPage && (
                <div className="flex text-gray-300 px-4" aria-hidden>
                  {"/"}
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
