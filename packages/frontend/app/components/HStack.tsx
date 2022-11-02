export interface HStackProps {
  children: React.ReactNode;
}

export const HStack = ({ children }: HStackProps) => {
  return <div>{children}</div>;
};
