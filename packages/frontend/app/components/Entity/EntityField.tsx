import { Typography } from "../Typography";

export interface EntityFieldProps {
  name: string;
  value: React.ReactNode;
}

export const EntityField = ({ name, value }: EntityFieldProps) => {
  return (
    <div>
      <Typography className="text-sm">{name}</Typography>
      <Typography className="text-sm !text-black !dark:text-slate-50" as="span">
        {value}
      </Typography>
    </div>
  );
};
