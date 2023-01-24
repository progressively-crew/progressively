export interface RadioProps extends React.HTMLAttributes<HTMLInputElement> {
  checkedColor?: string;
}

export const Radio = ({ checkedColor, ...props }: RadioProps) => {
  const radioStyle = { "--primary": checkedColor } as React.CSSProperties;

  const classes =
    "custom-radio appearance-none m-0 w-4 h-4 border border-gray-200 rounded-full flex items-center justify-center before:content-[''] before:h-2 before:w-2 before:rounded-full before:transition-all hover:before:bg-gray-300 checked:before:h-2 checked:before:w-2";

  return (
    <input type="radio" className={classes} style={radioStyle} {...props} />
  );
};
