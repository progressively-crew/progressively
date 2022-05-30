import { Typography } from "./Typography";

export interface BigStateProps {
  value: string | number;
  name: string;
}

export const BigState = ({ name, value }: BigStateProps) => {
  return (
    <div>
      <Typography>{name}</Typography>
      <Typography>{value}</Typography>
    </div>
  );
};
