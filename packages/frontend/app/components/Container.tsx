export interface ContainerProps {
  children: React.ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
  return <div className="max-w-screen-2xl mx-auto px-12">{children}</div>;
};
