import { Card, CardHeader } from "./CardGroup";
import { Typography } from "./Typography";

export interface BigStateProps {
  children: React.ReactNode;
  name: string;
  id?: string;
}

export const BigState = ({ name, children, id }: BigStateProps) => {
  return (
    <Card>
      <CardHeader>
        <Typography as="h3" id={id}>
          {name}
        </Typography>
      </CardHeader>

      <Typography>{children}</Typography>
    </Card>
  );
};
