export interface StackProps {
  children: React.ReactNode;
}

export const Stack = ({ children }: StackProps) => {
  return <div>{children}</div>;
};
