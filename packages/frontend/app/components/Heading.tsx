import { HStack } from "./HStack";

export interface HeadingProps {
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Heading = ({ icon, children, ...props }: HeadingProps) => {
  return (
    <h2 {...props}>
      <HStack spacing={2} inline>
        {icon && <span aria-hidden>{icon}</span>}
        {children}
      </HStack>
    </h2>
  );
};
