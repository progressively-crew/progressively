import { Typography } from "../Typography";

export interface EntityFieldProps {
  name: string;
  value: React.ReactNode;
}

export const EntityField = ({ name, value }: EntityFieldProps) => {
  return (
    <div>
      <Typography className="text-sm text-gray-600">{name}</Typography>
      <Typography className="text-sm text-black mt-1" as="span">
        {value}
      </Typography>
    </div>
  );
};
