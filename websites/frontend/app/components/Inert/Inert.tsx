import { useInert } from "./hooks/useInert";

export interface InertWhenNavOpenedProps {
  children: React.ReactNode;
  className?: string;
}

export const Inert = ({ children, ...props }: InertWhenNavOpenedProps) => {
  const { inert } = useInert();

  return (
    <div
      aria-hidden={inert}
      {...props}
      className="h-full min-h-full flex-1 flex flex-col"
    >
      {children}
    </div>
  );
};
