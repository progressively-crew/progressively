export interface SpacerProps {
  size?: number;
}

// eslint-disable-next-line sonarjs/cognitive-complexity
export const Spacer = ({ size }: SpacerProps) => {
  return (
    <div
      className={
        size === 1
          ? "h-1"
          : size === 2
          ? "h-2"
          : size === 3
          ? "h-3"
          : size === 4
          ? "h-4"
          : size === 5
          ? "h-5"
          : size === 6
          ? "h-6"
          : size === 7
          ? "h-7"
          : size === 8
          ? "h-8"
          : size === 9
          ? "h-9"
          : size === 10
          ? "h-10"
          : size === 11
          ? "h-11"
          : size === 12
          ? "h-12"
          : undefined
      }
    />
  );
};
