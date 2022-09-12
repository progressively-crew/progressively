import { useNavToggle } from "~/components/Breadcrumbs/hooks/useNavToggle";
import { styled } from "~/stitches.config";

const RawButton = styled("button", {
  border: "none",
  background: "none",
  padding: 0,
  margin: 0,
  cursor: "pointer",
});

export interface TreeToggleProps {
  children: React.ReactNode;
  label: string;
}
export const TreeToggle = ({ children, label }: TreeToggleProps) => {
  const { toggleNav } = useNavToggle();

  return (
    <RawButton onClick={toggleNav} aria-label={label}>
      {children}
    </RawButton>
  );
};
