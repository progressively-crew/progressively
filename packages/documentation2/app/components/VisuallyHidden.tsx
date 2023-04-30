const vhStyles = {
  border: "0px",
  clip: "rect(0 0 0 0)",
  height: "1px",
  margin: "-1px",
  overflow: "hidden",
  padding: "0px",
  position: "absolute",
  width: "1px",
};

export interface VisuallyHiddenProps {
  children: React.ReactNode;
  id?: string;
}
export const VisuallyHidden = ({ children, id }: VisuallyHiddenProps) => {
  return (
    <span style={vhStyles} id={id}>
      {children}
    </span>
  );
};
