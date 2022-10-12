import { styled } from "~/stitches.config";
import { Crumbs } from "./types";
import { Link } from "../Link";
import { HStack } from "../HStack";
import { useNavToggle } from "./hooks/useNavToggle";
import { Button } from "../Buttons/Button";
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { VisuallyHidden } from "../VisuallyHidden";
import { Spacer } from "../Spacer";

const Wrapper = styled("div", {
  position: "absolute",
  width: "100%",
  height: "100%",
  left: 0,
  top: 0,
  background: "$nemesisLight",
  zIndex: 2,
  boxSizing: "border-box",
  transform: "translateX(-100%)",
  transition: "all 0.3s",
  padding: "$spacing$8",

  variants: {
    opened: {
      true: {
        transform: "translateX(0%)",
      },
    },
  },
});

const Ol = styled("ol", {
  fontFamily: "$default",
  display: "flex",
  flexDirection: "column",
  height: "$cta",
  padding: "$spacing$1 0",
  gap: "$spacing$4",

  "& li a": {
    boxSizing: "border-box",
    color: "$hadesLight",
    transition: "border,box-shadow 0.2s",
    whiteSpace: "nowrap",
    textDecoration: "none",
    fontSize: "$jupiter",
  },

  "& li a:hover": {
    textDecoration: "underline",
  },

  "& li a:active": {
    textDecoration: "underline",
  },

  "& li:last-of-type a": {
    fontWeight: "$bold",
    textDecoration: "underline",
    color: "$nemesis",
  },

  "& li": {
    display: "flex",
    alignItems: "center",
  },
});

export interface DesktopNavProps {
  crumbs: Crumbs;
}

export const MobileNav = ({ crumbs }: DesktopNavProps) => {
  const { toggleNav, isNavOpened } = useNavToggle();
  const lastItemIndex = crumbs.length - 1;

  return (
    <div>
      <Button variant="tertiary" onClick={toggleNav}>
        <AiOutlineMenu />
        <VisuallyHidden>Toggle menu</VisuallyHidden>
      </Button>

      <Wrapper opened={isNavOpened}>
        <Button variant="primary" onClick={toggleNav} icon={<IoMdClose />}>
          Close menu
        </Button>

        <Spacer size={12} />

        <nav aria-label="Application breadcrumbs">
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
                    fontSize="uranus"
                  >
                    <HStack spacing={2}>{crumb.label}</HStack>
                  </Link>
                </li>
              );
            })}
          </Ol>
        </nav>
      </Wrapper>
    </div>
  );
};
