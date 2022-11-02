import { useNavToggle } from "./Breadcrumbs/hooks/useNavToggle";

export interface SkipNavContentProps {
  children: React.ReactNode;
}
export const SkipNavContent = ({ children }: SkipNavContentProps) => {
  return <div id="content">{children}</div>;
};

export interface SkipNavLinkProps {
  children: React.ReactNode;
}
export const SkipNavLink = ({ children }: SkipNavLinkProps) => {
  const { isNavOpened } = useNavToggle();

  return (
    <a
      href="#content"
      tabIndex={isNavOpened ? -1 : 0}
      aria-hidden={isNavOpened}
    >
      {children}
    </a>
  );
};
