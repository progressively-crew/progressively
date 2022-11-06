export interface CardProps {
  title: string;
  children: React.ReactNode;
  size?: "M" | "L";
}

const SizeStyles = {
  M: "text-3xl",
  L: "text-5xl",
};

export const Card = ({ title, children, size = "M" }: CardProps) => {
  const sizeStyles = SizeStyles[size];
  return (
    <article className="bg-white rounded-lg drop-shadow-lg border border-gray-200 px-4 py-8 h-full">
      <h2 className={"font-semibold text-center " + sizeStyles}>{title}</h2>

      <div className="text-center pt-3 text-gray-700 text-lg">{children}</div>
    </article>
  );
};
