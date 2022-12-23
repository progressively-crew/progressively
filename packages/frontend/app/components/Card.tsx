export interface CardProps {
  children: React.ReactNode;
}

export const Card = ({ children }: CardProps) => {
  return (
    <div className="border border-gray-100 rounded-md bg-white dark:border-slate-700 dark:bg-slate-800 overflow-hidden">
      {children}
    </div>
  );
};

export interface CardContentProps {
  children: React.ReactNode;
}
export const CardContent = ({ children }: CardContentProps) => {
  return <div className="p-8">{children}</div>;
};
