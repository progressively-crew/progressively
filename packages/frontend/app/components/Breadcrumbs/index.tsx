import { HideDesktop, HideTablet } from "../HideMobile";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import { Crumbs } from "./types";

export interface BreadCrumbsProps {
  crumbs: Crumbs;
}

export const BreadCrumbs = ({ crumbs }: BreadCrumbsProps) => {
  return (
    <>
      <HideDesktop>
        <MobileNav crumbs={crumbs} />
      </HideDesktop>

      <HideTablet>
        <DesktopNav crumbs={crumbs} />
      </HideTablet>
    </>
  );
};
