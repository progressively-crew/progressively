export const HideDesktop = (props: React.HTMLAttributes<HTMLElement>) => {
  return <span className="md:hidden" {...props} />;
};

export const HideTablet = (props: React.HTMLAttributes<HTMLElement>) => {
  return <span className="hidden lg:block" {...props} />;
};

export const HideMobile = (props: React.HTMLAttributes<HTMLElement>) => {
  return <span className="hidden md:block" {...props} />;
};
