import {
  SkipNavContent as CSkipNavContent,
  SkipNavLink as CSkipNavLink,
} from "@chakra-ui/skip-nav";

export interface SkipNavContentProps {
  children: React.ReactNode;
}
export const SkipNavContent = ({ children }: SkipNavContentProps) => {
  return <CSkipNavContent>{children}</CSkipNavContent>;
};

export interface SkipNavLinkProps {
  children: React.ReactNode;
}
export const SkipNavLink = ({ children }: SkipNavLinkProps) => {
  return <CSkipNavLink>{children}</CSkipNavLink>;
};
