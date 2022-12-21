export interface BackgroundProps {
  children: React.ReactNode;
}

export const Background = ({ children }: BackgroundProps) => {
  return (
    <div className="min-h-full bg-gray-50 dark:bg-slate-900 h-full">
      {children}
    </div>
  );
};
