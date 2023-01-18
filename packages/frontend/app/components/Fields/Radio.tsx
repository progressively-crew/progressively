export interface RadioProps extends React.HTMLAttributes<HTMLInputElement> {
  checkedColor?: string;
}

export const Radio = ({ checkedColor, ...props }: RadioProps) => {
  const radioStyle = { "--primary": checkedColor } as React.CSSProperties;

  const classes =
    "custom-radio appearance-none m-0 w-6 h-6 border border-gray-200 rounded-full flex items-center justify-center before:content-[''] before:h-2 before:w-2 before:rounded-full before:transition-all hover:before:bg-gray-300 checked:before:h-4 checked:before:w-4";

  return (
    <input type="radio" className={classes} style={radioStyle} {...props} />
  );
};
