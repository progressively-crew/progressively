export interface BackgroundProps {
  children: React.ReactNode;
}

export const Background = ({ children }: BackgroundProps) => {
  return <div className="pb-12 min-h-full bg-gray-50">{children}</div>;
};
