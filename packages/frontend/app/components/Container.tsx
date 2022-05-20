import { Container as CContainer } from "@chakra-ui/react";

export interface ContainerProps {
  children: React.ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
  return <CContainer maxW="5xl">{children}</CContainer>;
};
