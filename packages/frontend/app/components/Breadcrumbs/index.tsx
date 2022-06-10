import { styled } from "~/stitches.config";
import { HideMobile } from "../HideMobile";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import { Crumbs } from "./types";

export interface BreadCrumbsProps {
  crumbs: Crumbs;
}

const MobileWrapper = styled("div", {
  display: "none",
  "@mobile": {
    display: "block",
  },
});

export const BreadCrumbs = ({ crumbs }: BreadCrumbsProps) => {
  return (
    <>
      <HideMobile>
        <DesktopNav crumbs={crumbs} />
      </HideMobile>

      <MobileWrapper>
        <MobileNav crumbs={crumbs} />
      </MobileWrapper>
    </>
  );
};
