import { IoMdClose } from "react-icons/io";
import { styled } from "~/stitches.config";
import { Button } from "../Buttons/Button";
import { useNavToggle } from "./hooks/useNavToggle";

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
    fontSize: "$h3",
    margin: "unset",
  },
});

export const MobileNav = () => {
  const { toggleNav, isNavOpened } = useNavToggle();
  return (
    <NavWrapper opened={isNavOpened}>
      <MobileHeaderWrapper>
        <Button variant="ghost" aria-label="Close the menu" onClick={toggleNav}>
          <IoMdClose aria-hidden />
        </Button>
      </MobileHeaderWrapper>
    </NavWrapper>
  );
};
