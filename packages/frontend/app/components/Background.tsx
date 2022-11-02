export interface BackgroundProps {
  children: React.ReactNode;
}

export const Background = ({ children }: BackgroundProps) => {
  return <div className="h-full bg-gray-50">{children}</div>;
};
