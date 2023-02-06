export interface WithAs extends React.HTMLAttributes<HTMLElement> {
  as?: any;
}

export const HideDesktop = ({
  as: Component = "span",
  className,
  ...props
}: WithAs) => {
  return <Component className={"lg:hidden " + className} {...props} />;
};

export const HideTablet = ({
  as: Component = "span",
  className,
  ...props
}: WithAs) => {
  return <Component className={"hidden lg:block " + className} {...props} />;
};

export const HideMobile = ({ as: Component = "span", ...props }: WithAs) => {
  return <Component className="hidden md:block" {...props} />;
};
