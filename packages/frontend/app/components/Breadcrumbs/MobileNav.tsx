import { IoMdClose } from "react-icons/io";
import { MdChevronRight } from "react-icons/md";
import { Button } from "../Buttons/Button";
import { Link } from "../Link";
import { useNavToggle } from "./hooks/useNavToggle";
import { Crumbs } from "./types";
import { FocusTrap } from "../FocusTrap";

export interface DesktopNavProps {
  crumbs: Crumbs;
}

export const MobileNav = ({ crumbs }: DesktopNavProps) => {
  const { toggleNav, isNavOpened } = useNavToggle();
  const lastItemIndex = crumbs.length - 1;

  const tabIndex = isNavOpened ? 0 : -1;

  return (
    <nav aria-hidden={!isNavOpened} aria-label="General navigation">
      <FocusTrap isActive={isNavOpened}>
        <div>
          <Button
            variant="ghost"
            aria-label="Close the menu"
            onClick={toggleNav}
            tabIndex={tabIndex}
          >
            <IoMdClose aria-hidden />
          </Button>
        </div>

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
                  tabIndex={tabIndex}
                  to={crumb.link}
                >
                  {crumb.label}
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
      </FocusTrap>
    </nav>
  );
};
