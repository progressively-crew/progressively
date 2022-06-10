import { IoMdMenu } from "react-icons/io";
import { styled } from "~/stitches.config";
import { useNavToggle } from "./Breadcrumbs/hooks/useNavToggle";
import { Button } from "./Buttons/Button";
import { HideMobile } from "./HideMobile";
import { Link } from "./Link";
import { Typography } from "./Typography";

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
      fontSize: "$h3",
      margin: "unset",
    },
  },
});

export const Logo = ({ to, hideOnMobile }: LogoProps) => {
  const { toggleNav } = useNavToggle();

  return (
    <Wrapper>
      {/** This is the mobile menu toggler taking place of the logo on mobile */}
      {!hideOnMobile && (
        <Button
          variant="ghost"
          onClick={toggleNav}
          aria-label="Toggle navigation"
        >
          <IoMdMenu aria-hidden />
        </Button>
      )}

      <HideMobile>
        <Link to={to || "/dashboard"}>
          <Typography as="span">Progressively</Typography>
        </Link>
      </HideMobile>
    </Wrapper>
  );
};
