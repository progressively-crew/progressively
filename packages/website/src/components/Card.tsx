export interface CardProps {
  children: React.ReactNode;
}

export const Card = ({ children }: CardProps) => {
  return (
    <div
      className={`border border-gray-200 px-4 py-6 rounded-md bg-white shadow-sm h-full`}
    >
      {children}
    </div>
  );
};
