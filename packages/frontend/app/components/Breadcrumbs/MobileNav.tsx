import { IoMdClose } from "react-icons/io";
import { styled } from "~/stitches.config";
import { MdChevronRight } from "react-icons/md";
import { Button } from "../Buttons/Button";
import { Link } from "../Link";
import { useNavToggle } from "./hooks/useNavToggle";
import { Crumbs } from "./types";
import { FocusTrap } from "../FocusTrap";

const NavWrapper = styled("nav", {
  transform: "translateX(-100%)",
  transition: "all 0.3s",
  position: "fixed",
  left: 0,
  top: 0,
  background: "$background",
  height: "100%",
  width: "100%",
  zIndex: 2,

  "& a": {
    fontSize: "$mars",
    color: "$textAccent",
  },

  "& svg": {
    transform: "rotateZ(90deg)",
  },

  "& ol": {
    textAlign: "center",

    "& li:last-of-type a": {
      fontWeight: "$fontWeights$bold",
      color: "$secondary",
    },
  },

  variants: {
    opened: {
      true: {
        transform: "translateX(0%)",
      },
    },
  },
});

const MobileHeaderWrapper = styled("div", {
  display: "flex",
  justifyContent: "flex-end",
  padding: "$spacing$4",
  marginBottom: "$spacing$10",

  "& button": {
    width: "$cta",
    height: "$cta",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  "& button svg": {
    fontSize: "$mars",
    margin: "unset",
  },
});

const Separator = styled("div", {
  margin: "0 $spacing$2",
  display: "inline-block",

  "& svg": {
    fill: "$text",
  },
});

export interface DesktopNavProps {
  crumbs: Crumbs;
}

export const MobileNav = ({ crumbs }: DesktopNavProps) => {
  const { toggleNav, isNavOpened } = useNavToggle();
  const lastItemIndex = crumbs.length - 1;

  const tabIndex = isNavOpened ? 0 : -1;

  return (
    <NavWrapper
      opened={isNavOpened}
      aria-hidden={!isNavOpened}
      aria-label="General navigation"
    >
      <FocusTrap isActive={isNavOpened}>
        <MobileHeaderWrapper>
          <Button
            variant="ghost"
            aria-label="Close the menu"
            onClick={toggleNav}
            tabIndex={tabIndex}
          >
            <IoMdClose aria-hidden />
          </Button>
        </MobileHeaderWrapper>

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
                  <Separator aria-hidden>
                    <MdChevronRight />
                  </Separator>
                )}
              </li>
            );
          })}
        </ol>
      </FocusTrap>
    </NavWrapper>
  );
};
