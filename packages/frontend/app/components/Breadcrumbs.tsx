import { IoMdClose } from "react-icons/io";
import { MdChevronRight } from "react-icons/md";
import { styled } from "~/stitches.config";
import { Button } from "./Buttons/Button";
import { Link } from "./Link";

const Ol = styled("ol", {
  fontFamily: "$default",
  color: "$content",
  display: "flex",

  "& li a": {
    transition: "border,box-shadow 0.2s",
  },

  "& li:last-of-type a": {
    fontWeight: "$fontWeights$bold",
    color: "$hover",
  },

  "& li": {
    display: "flex",
    alignItems: "center",
  },
});

const Separator = styled("div", {
  margin: "0 $spacing$2",
  display: "inline-block",
});

export interface Crumb {
  link: string;
  label: string;
  forceNotCurrent?: boolean;
}

export type Crumbs = Array<Crumb>;

export interface BreadCrumbsProps {
  crumbs: Crumbs;
}

const NavWrapper = styled("nav", {
  "@mobile": {
    position: "fixed",
    left: 0,
    top: 0,
    background: "$background",
    height: "100%",
    width: "100%",
    zIndex: 2,

    "& ol": {
      flexDirection: "column",
    },

    "& ol li": {
      display: "flex",
      flexDirection: "column",
    },

    "& a": {
      fontSize: "$h3",
    },

    "& svg": {
      transform: "rotateZ(90deg)",
    },
  },
});

const MobileHeaderWrapper = styled("div", {
  display: "none",
  "@mobile": {
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
      fontSize: "$h3",
      margin: "unset",
    },
  },
});

export const BreadCrumbs = ({ crumbs }: BreadCrumbsProps) => {
  const lastItemIndex = crumbs.length - 1;

  return (
    <NavWrapper aria-label="Breadcrumb">
      <MobileHeaderWrapper>
        <Button variant="ghost" aria-label="Close the menu">
          <IoMdClose aria-hidden />
        </Button>
      </MobileHeaderWrapper>

      <Ol>
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
      </Ol>
    </NavWrapper>
  );
};
