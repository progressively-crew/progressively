export interface BackgroundProps {
  children: React.ReactNode;
}

export const Background = ({ children }: BackgroundProps) => {
  return (
    <div className="min-h-full flex flex-col bg-gradient-to-r bg-gradient-to-r from-indigo-300 via-red-300 to-yellow-200 py-4 px-4 dark:bg-gradient-to-r dark:from-indigo-900 dark:via-purple-900 dark:to-indigo-900">
      {children}
    </div>
  );
};
