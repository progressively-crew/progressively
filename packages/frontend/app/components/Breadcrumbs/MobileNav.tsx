import { Crumbs } from "./types";
import { Link } from "../Link";
import { HStack } from "../HStack";
import { useNavToggle } from "./hooks/useNavToggle";
import { Button } from "../Buttons/Button";
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { VisuallyHidden } from "../VisuallyHidden";
import { Spacer } from "../Spacer";
import { FocusTrap } from "../FocusTrap";
import { InitialBox } from "../InitialBox";
import { ThemeSwitch } from "../ThemeSwitch";

export interface DesktopNavProps {
  crumbs: Crumbs;
}

export const MobileNav = ({ crumbs }: DesktopNavProps) => {
  const { toggleNav, isNavOpened } = useNavToggle();
  const lastItemIndex = crumbs.length - 1;

  const translateClass = isNavOpened ? "translate-x-0" : "-translate-x-full";

  return (
    <div>
      <Button
        variant="tertiary"
        onClick={toggleNav}
        tabIndex={isNavOpened ? -1 : 0}
        aria-hidden={isNavOpened}
      >
        <AiOutlineMenu />
        <VisuallyHidden>Toggle menu</VisuallyHidden>
      </Button>

      <div
        className={
          "absolute z-20 h-full w-full bg-white dark:bg-slate-800 top-0 bottom-0 left-0 transition-transform ease-in-out duration-200 " +
          translateClass
        }
      >
        <FocusTrap isActive={isNavOpened}>
          <div className="p-4">
            <div className="flex flex-row justify-between gap-4">
              <div className="flex-1">
                <Button
                  variant="primary"
                  onClick={toggleNav}
                  icon={<IoMdClose />}
                  tabIndex={isNavOpened ? 0 : -1}
                  aria-hidden={!isNavOpened}
                >
                  Close menu
                </Button>
              </div>

              <div>
                <ThemeSwitch />
              </div>
            </div>

            <Spacer size={12} />

            <nav
              aria-label="Application breadcrumbs"
              aria-hidden={!isNavOpened}
            >
              <ol>
                {crumbs.map((crumb, index) => {
                  const currentPage = index === lastItemIndex;

                  return (
                    <li key={crumb.link}>
                      <Link
                        tabIndex={isNavOpened ? 0 : -1}
                        aria-hidden={!isNavOpened}
                        aria-current={
                          crumb.forceNotCurrent
                            ? undefined
                            : currentPage
                            ? "page"
                            : undefined
                        }
                        to={crumb.link}
                        className="h-10 block flex items-center dark:text-slate-200 text-xl"
                      >
                        <HStack spacing={2}>
                          <InitialBox content={crumb.label} size="S" />
                          {crumb.label}
                        </HStack>
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </nav>
          </div>
        </FocusTrap>
      </div>
    </div>
  );
};
