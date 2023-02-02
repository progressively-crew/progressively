export interface BackgroundProps {
  children: React.ReactNode;
}

export const Background = ({ children }: BackgroundProps) => {
  return (
    <div className="min-h-full flex flex-col bg-white dark:bg-slate-900">
      {children}
    </div>
  );
};
