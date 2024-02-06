import { useInert } from "./Inert/hooks/useInert";

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
  const { inert } = useInert();

  return (
    <a
      href="#content"
      tabIndex={inert ? -1 : 0}
      aria-hidden={inert}
      className="sr-only focus:not-sr-only focus:absolute bg-slate-800 text-white focus:p-4 rounded focus:m-4 z-30"
    >
      {children}
    </a>
  );
};
