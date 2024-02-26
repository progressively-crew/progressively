export interface BackgroundProps {
  children: React.ReactNode;
  spacing?: "S" | "M";
}

const spacingStyles = {
  S: "md:py-0.5 md:px-0.5",
  M: "md:py-4 md:px-4",
};

export const Background = ({ children, spacing = "M" }: BackgroundProps) => {
  const spacingStyle = spacingStyles[spacing];

  return (
    <div
      className={`min-h-full flex flex-col bg-gradient-to-r bg-gradient-to-r from-indigo-300 via-red-300 to-yellow-200 ${spacingStyle}`}
    >
      {children}
    </div>
  );
};
