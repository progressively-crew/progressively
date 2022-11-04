import { MdChevronRight } from "react-icons/md";
import { HStack } from "../HStack";
import { Link } from "../Link";
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
                "flex items-center hover:underline last-of-type:text-indigo-700 last-of-type:font-bold last-of-type:underline"
              }
            >
              <Link
                aria-current={currentPage ? "page" : undefined}
                to={crumb.link}
              >
                <HStack spacing={2}>
                  <CrumbIcon crumb={crumb} />
                  {crumb.label}
                </HStack>
              </Link>

              {!currentPage && (
                <div className="flex text-gray-700 px-2" aria-hidden>
                  <MdChevronRight />
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
