import { HideDesktop, HideTablet } from "../HideMobile";
import { DocMenu } from "./DocMenu";
import { MobileNav } from "./MobileNav";

export const Nav = () => {
  return (
    <>
      <HideDesktop>
        <MobileNav />
      </HideDesktop>

      <HideTablet>
        <DocMenu />
      </HideTablet>
    </>
  );
};
