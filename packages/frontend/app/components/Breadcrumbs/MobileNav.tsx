import { IoArrowBackOutline } from "react-icons/io5";
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
import { Avatar } from "../Avatar";
import { useUser } from "~/modules/user/contexts/useUser";

export interface DesktopNavProps {
  crumbs: Crumbs;
}

export const MobileNav = ({ crumbs }: DesktopNavProps) => {
  const { user } = useUser();
  const { toggleNav, isNavOpened } = useNavToggle();
  const lastItemIndex = crumbs.length - 1;

  const prevCrumbIndex = lastItemIndex - 1;
  const prevCrumb = crumbs[prevCrumbIndex];

  const translateClass = isNavOpened ? "translate-x-0" : "-translate-x-full";

  return (
    <div
      className={`flex flex-row ${
        prevCrumb ? "justify-between" : "justify-end"
      }`}
    >
      {prevCrumb && (
        <Button
          variant="tertiary"
          tabIndex={isNavOpened ? -1 : 0}
          aria-hidden={isNavOpened}
          to={prevCrumb.link}
          className={"-ml-4"}
        >
          <IoArrowBackOutline className="text-2xl" />
          <VisuallyHidden>Go back to</VisuallyHidden>
          {prevCrumb.label}
        </Button>
      )}

      <Button
        variant="tertiary"
        onClick={toggleNav}
        tabIndex={isNavOpened ? -1 : 0}
        aria-hidden={isNavOpened}
        className={"-mr-4"}
      >
        <AiOutlineMenu className="text-2xl" />
        <VisuallyHidden>Toggle menu</VisuallyHidden>
      </Button>

      <div
        className={
          "absolute z-20 h-full w-full bg-white dark:bg-slate-800 top-0 bottom-0 right-0 transition-transform ease-in-out duration-200 " +
          translateClass
        }
      >
        <FocusTrap isActive={isNavOpened} className="h-full relative">
          <div className="p-4 h-full">
            <div className="flex flex-row justify-between gap-4">
              <div className="flex-1">
                <Button
                  variant="tertiary"
                  onClick={toggleNav}
                  tabIndex={isNavOpened ? 0 : -1}
                  aria-hidden={!isNavOpened}
                >
                  <IoMdClose className="text-2xl" />
                  <VisuallyHidden>Close menu</VisuallyHidden>
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
              className="h-full flex"
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

              <div className="bg-gray-100 absolute bottom-0 w-full left-0 py-2">
                <Button
                  className="w-full"
                  to="/profile"
                  icon={<Avatar aria-hidden>{user.fullname}</Avatar>}
                  variant="tertiary"
                >
                  {user.fullname}
                </Button>
              </div>
            </nav>
          </div>
        </FocusTrap>
      </div>
    </div>
  );
};
