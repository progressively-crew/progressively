import { Stack } from "../Stack";

export interface FormGroupProps {
  children: React.ReactNode;
}
export const FormGroup = ({ children }: FormGroupProps) => {
  return <Stack spacing={6}>{children}</Stack>;
};
