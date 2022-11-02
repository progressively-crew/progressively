export interface HStackProps {
  children: React.ReactNode;
  spacing?: number;
  as?: any;
}

// eslint-disable-next-line sonarjs/cognitive-complexity
export const HStack = ({ children, spacing, as: asComponent }: HStackProps) => {
  const Component = asComponent || "div";

  return (
    <Component
      className={
        spacing === 1
          ? "flex flex-row gap-1"
          : spacing === 2
          ? "flex flex-row gap-2"
          : spacing === 3
          ? "flex flex-row gap-3"
          : spacing === 4
          ? "flex flex-row gap-4"
          : spacing === 5
          ? "flex flex-row gap-5"
          : spacing === 6
          ? "flex flex-row gap-6"
          : undefined
      }
    >
      {children}
    </Component>
  );
};
