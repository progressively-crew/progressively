export interface CardProps {
  children: React.ReactNode;
}

export const Card = ({ children }: CardProps) => {
  return (
    <div className="border border-color-gray-500 rounded bg-white">
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
