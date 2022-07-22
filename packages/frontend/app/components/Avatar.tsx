import { styled } from "~/stitches.config";

export interface AvatarProps {
  children: string;
}

const AvatarWrapper = styled("div", {
  textTransform: "uppercase",
  width: "$avatar",
  height: "$avatar",
  borderRadius: "50%",
  color: "$textAccent",
  background: "$primary",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const Avatar = ({ children }: AvatarProps) => {
  const firstLetter = children[0];

  return <AvatarWrapper aria-hidden>{firstLetter}</AvatarWrapper>;
};
