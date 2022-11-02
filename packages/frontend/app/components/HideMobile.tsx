export interface HideDesktopProps {
  children: React.ReactNode;
}

export const HideDesktop = ({ children }: HideDesktopProps) => {
  return <span>{children}</span>;
};

export interface HideTabletProps {
  children: React.ReactNode;
}

export const HideTablet = ({ children }: HideTabletProps) => {
  return <span>{children}</span>;
};

export interface HideMobileProps {
  children: React.ReactNode;
}

export const HideMobile = ({ children }: HideMobileProps) => {
  return <span>{children}</span>;
};
