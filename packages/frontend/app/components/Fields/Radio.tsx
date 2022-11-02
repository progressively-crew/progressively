export interface RadioProps extends React.HTMLAttributes<HTMLInputElement> {
  children: React.ReactNode;
}
export const Radio = (props: RadioProps) => {
  return <input {...props} />;
};
