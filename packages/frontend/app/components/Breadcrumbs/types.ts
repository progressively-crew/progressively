export interface Crumb {
  link: string;
  label: string;
  forceNotCurrent?: boolean;
}

export type Crumbs = Array<Crumb>;

export interface DesktopNavProps {
  crumbs: Crumbs;
}
