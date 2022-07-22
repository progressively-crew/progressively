import { styled } from "~/stitches.config";

const SkipNavAnchor = styled("a", {
  background: "$textAccent",
  color: "$background",
  position: "absolute",
  transform: "translateY(-100%)",
  fontFamily: "$default",
  padding: "$spacing$3",
  borderRadius: "$borderRadius$regular",
  zIndex: 1,
  "&:focus": {
    left: "$spacing$4",
    top: "$spacing$4",
    transform: "translateY(0%)",
  },
});

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
  return <SkipNavAnchor href="#content">{children}</SkipNavAnchor>;
};
