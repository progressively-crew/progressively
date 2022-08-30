import { IoMdMenu } from "react-icons/io";
import { styled } from "~/stitches.config";
import { useNavToggle } from "./Breadcrumbs/hooks/useNavToggle";
import { HideMobile } from "./HideMobile";
import { DarkLogo } from "./Logo/DarkLogo";

export interface LogoProps {
  to?: string;
  hideOnMobile?: boolean;
}

const Wrapper = styled("div", {
  "& button": {
    display: "none",
    width: "$cta",
    height: "$cta",
    alignItems: "center",
    justifyContent: "center",
  },
  "@mobile": {
    "& button": {
      display: "flex",
    },

    "& button svg": {
      fontSize: "$mars",
      margin: "unset",
    },
  },
});

const Btn = styled("button", {
  color: "$apollo",
  background: "transparent",
  border: "none",
  height: "$cta",
  width: "$cta",
});

export const Menu = ({ to, hideOnMobile }: LogoProps) => {
  const { toggleNav } = useNavToggle();

  return (
    <Wrapper>
      {/** This is the mobile menu toggler taking place of the logo on mobile */}
      {!hideOnMobile && (
        <Btn onClick={toggleNav} aria-label="Toggle navigation">
          <IoMdMenu aria-hidden />
        </Btn>
      )}

      <HideMobile>
        <DarkLogo to={to || "/dashboard"} />
      </HideMobile>
    </Wrapper>
  );
};
