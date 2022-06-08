import { styled } from "~/stitches.config";
import { Card, CardContent, CardHeader } from "./CardGroup";
import { Typography } from "./Typography";

const BigStatLabel = styled(Typography, {});
const BigStatValue = styled(CardContent, {
  "& p": { fontSize: "$title" },
  color: "$title",
  fontFamily: "$default",
});

export interface BigStateProps {
  value: string | number;
  name: string;
}

export const BigState = ({ name, value }: BigStateProps) => {
  return (
    <Card>
      <CardHeader>
        <BigStatLabel>{name}</BigStatLabel>
      </CardHeader>

      <BigStatValue>
        <p>{value}</p>
      </BigStatValue>
    </Card>
  );
};
