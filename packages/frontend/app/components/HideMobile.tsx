import { styled } from "~/stitches.config";

export const HideMobile = styled("span", {
  "@mobile": {
    display: "none",
  },
});

export const HideTablet = styled("span", {
  "@tablet": {
    display: "none",
  },
});

export const HideDesktop = styled("span", {
  display: "none",
  "@tablet": {
    display: "unset",
  },
});
