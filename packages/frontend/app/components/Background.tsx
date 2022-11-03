export interface BackgroundProps {
  children: React.ReactNode;
}

export const Background = ({ children }: BackgroundProps) => {
  return <div className="min-h-full bg-gray-50">{children}</div>;
};
