import { ListItem, UnorderedList } from "@chakra-ui/react";

export interface UlProps {
  children: React.ReactNode;
}

export const Ul = ({ children }: UlProps) => {
  return <UnorderedList>{children}</UnorderedList>;
};

export interface LiProps {
  children: React.ReactNode;
  id?: string;
  color?: string;
}

export const Li = ({ children, id, color }: LiProps) => {
  return (
    <ListItem id={id} color={color}>
      {children}
    </ListItem>
  );
};
