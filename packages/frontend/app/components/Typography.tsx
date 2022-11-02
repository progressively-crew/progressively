export interface TypographyProps {
  children: React.ReactNode;
}

export const Typography = ({ children }: TypographyProps) => {
  return <p>{children}</p>;
};
