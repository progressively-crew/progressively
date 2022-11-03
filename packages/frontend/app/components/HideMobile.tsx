export interface WithAs extends React.HTMLAttributes<HTMLElement> {
  as?: any;
}

export const HideDesktop = ({ as: Component = "span", ...props }: WithAs) => {
  return <Component className="md:hidden" {...props} />;
};

export const HideTablet = ({ as: Component = "span", ...props }: WithAs) => {
  return <Component className="hidden lg:block" {...props} />;
};

export const HideMobile = ({ as: Component = "span", ...props }: WithAs) => {
  return <Component className="hidden md:block" {...props} />;
};
