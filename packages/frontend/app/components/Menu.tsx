import { IoMdMenu } from "react-icons/io";
import { useNavToggle } from "./Breadcrumbs/hooks/useNavToggle";
import { Button } from "./Buttons/Button";
import { HideMobile } from "./HideMobile";
import { DarkLogo } from "./Logo/DarkLogo";

export interface LogoProps {
  to?: string;
  hideOnMobile?: boolean;
}

export const Menu = ({ to, hideOnMobile }: LogoProps) => {
  const { toggleNav } = useNavToggle();

  return (
    <div>
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
        <DarkLogo to={to || "/dashboard"} />
      </HideMobile>
    </div>
  );
};
