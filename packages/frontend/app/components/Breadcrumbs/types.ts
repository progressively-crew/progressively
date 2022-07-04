import React from "react";

export interface Crumb {
  link: string;
  label: string;
  forceNotCurrent?: boolean;
  icon?: React.ReactNode;
}

export type Crumbs = Array<Crumb>;

export interface DesktopNavProps {
  crumbs: Crumbs;
}
