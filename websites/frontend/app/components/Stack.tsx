export interface StackProps {
  children: React.ReactNode;
  spacing?: number;
}

export const Stack = ({ children, spacing }: StackProps) => {
  return (
    <div
      className={
        spacing === 1
          ? "flex flex-col gap-1"
          : spacing === 2
          ? "flex flex-col gap-2"
          : spacing === 3
          ? "flex flex-col gap-3"
          : spacing === 4
          ? "flex flex-col gap-4"
          : spacing === 5
          ? "flex flex-col gap-5"
          : spacing === 6
          ? "flex flex-col gap-6"
          : spacing === 7
          ? "flex flex-col gap-7"
          : spacing === 8
          ? "flex flex-col gap-8"
          : undefined
      }
    >
      {children}
    </div>
  );
};
