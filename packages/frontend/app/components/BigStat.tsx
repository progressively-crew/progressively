import { styled } from "~/stitches.config";
import { Card, CardContent, CardHeader } from "./CardGroup";
import { Typography } from "./Typography";

const BigStatLabel = styled(Typography, {
  marginBottom: "$spacing$4",

  "& h3": {
    lineHeight: "unset",
  },
});
const BigStatValue = styled(CardContent, {
  "& p": { fontSize: "$title", lineHeight: "unset" },
  color: "$title",
  fontFamily: "$default",
});

export interface BigStateProps {
  children: React.ReactNode;
  name: string;
  id?: string;
}

export const BigState = ({ name, children, id }: BigStateProps) => {
  return (
    <Card>
      <CardHeader>
        <BigStatLabel as="h3" id={id}>
          {name}
        </BigStatLabel>
      </CardHeader>

      <BigStatValue>{children}</BigStatValue>
    </Card>
  );
};
