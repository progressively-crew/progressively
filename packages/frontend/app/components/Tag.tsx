import { Tag as CTag } from "@chakra-ui/react";

export interface TagProps {
  children: React.ReactNode;
}

export const Tag = ({ children }: TagProps) => {
  return <CTag>{children}</CTag>;
};
