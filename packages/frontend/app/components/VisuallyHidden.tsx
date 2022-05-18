import { VisuallyHidden as VH } from "@chakra-ui/react";

export interface VisuallyHiddenProps {
  children: React.ReactNode;
}
export const VisuallyHidden = ({ children }: VisuallyHiddenProps) => {
    return <VH>{children}</VH>
};
