import { styled } from "~/stitches.config";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import { Crumbs } from "./types";

export interface BreadCrumbsProps {
  crumbs: Crumbs;
}

const DesktopWrapper = styled("div", {
  "@mobile": {
    display: "none",
  },
});

const MobileWrapper = styled("div", {
  display: "none",
  "@mobile": {
    display: "block",
  },
});

export const BreadCrumbs = ({ crumbs }: BreadCrumbsProps) => {
  return (
    <>
      <DesktopWrapper>
        <DesktopNav crumbs={crumbs} />
      </DesktopWrapper>

      <MobileWrapper>
        <MobileNav />
      </MobileWrapper>
    </>
  );
};
