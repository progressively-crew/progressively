export interface BackgroundProps {
  children: React.ReactNode;
  spacing?: "S" | "M";
}

const spacingStyles = {
  S: "py-0.5 px-0.5",
  M: "py-4 px-4",
};

export const Background = ({ children, spacing = "M" }: BackgroundProps) => {
  const spacingStyle = spacingStyles[spacing];

  return (
    <div
      className={`min-h-full flex flex-col bg-gradient-to-r bg-gradient-to-r from-indigo-300 via-red-300 to-yellow-200  dark:bg-gradient-to-r dark:from-indigo-900 dark:via-purple-900 dark:to-indigo-900 ${spacingStyle}`}
    >
      {children}
    </div>
  );
};
