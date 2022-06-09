import { useNavToggle } from "./hooks/useNavToggle";

export interface InertWhenNavOpenedProps {
  children: React.ReactNode;
}

export const InertWhenNavOpened = ({ children }: InertWhenNavOpenedProps) => {
  const { isNavOpened } = useNavToggle();

  return <div aria-hidden={isNavOpened}>{children}</div>;
};
