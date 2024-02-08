import React from "react";

export interface Crumb {
  link: string;
  label: string;
  forceNotCurrent?: boolean;
  icon?: React.ReactNode;
  isRoot?: boolean;
  isProject?: boolean;
  isFlag?: boolean;
  menuItems?: Array<{
    label: string;
    href: string;
  }>;
  menuLabel?: string;
}

export type Crumbs = Array<Crumb>;

export interface DesktopNavProps {
  crumbs: Crumbs;
}
