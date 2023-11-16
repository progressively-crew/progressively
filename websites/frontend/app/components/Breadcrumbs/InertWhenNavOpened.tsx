import { useNavToggle } from "./hooks/useNavToggle";

export interface InertWhenNavOpenedProps {
  children: React.ReactNode;
}

export const InertWhenNavOpened = ({
  children,
  ...props
}: InertWhenNavOpenedProps) => {
  const { isNavOpened } = useNavToggle();

  return (
    <div aria-hidden={isNavOpened} {...props}>
      {children}
    </div>
  );
};
