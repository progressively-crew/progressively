import { Badge as CBadge } from "@chakra-ui/react";

export interface BadgeProps {
  children: React.ReactNode;
}

export const Badge = ({ children }: BadgeProps) => {
  return <CBadge>{children}</CBadge>;
};
