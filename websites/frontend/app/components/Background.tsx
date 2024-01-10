export interface BackgroundProps {
  children: React.ReactNode;
}

export const Background = ({ children }: BackgroundProps) => {
  return (
    <div className="min-h-full flex flex-col bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 py-4 px-4">
      {children}
    </div>
  );
};
