import { MdChevronRight } from "react-icons/md";
import { Link } from "../Link";
import { Crumbs } from "./types";

export interface DesktopNavProps {
  crumbs: Crumbs;
}

export const DesktopNav = ({ crumbs }: DesktopNavProps) => {
  const lastItemIndex = crumbs.length - 1;

  return (
    <nav aria-label="Breadcrumb">
      <ol>
        {crumbs.map((crumb, index) => {
          const currentPage = index === lastItemIndex;

          return (
            <li key={crumb.link}>
              <Link
                aria-current={
                  crumb.forceNotCurrent
                    ? undefined
                    : currentPage
                    ? "page"
                    : undefined
                }
                to={crumb.link}
              >
                <span>
                  {crumb.icon}
                  {crumb.label}
                </span>
              </Link>

              {!currentPage && (
                <div aria-hidden>
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
