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
  fontFamily: "$default",

  "& p": {
    display: "inline",
    fontSize: "$title",
    lineHeight: "unset",
    color: "$hover",
    borderBottom: "3px solid $hover",
  },

  variants: {
    secondary: {
      true: {
        "& p": {
          color: "$title",
          borderBottom: "3px dashed $title",
        },
      },
    },
  },
});

export interface BigStateProps {
  children: React.ReactNode;
  name: string;
  id?: string;
  secondary?: boolean;
}

export const BigState = ({ name, children, id, secondary }: BigStateProps) => {
  return (
    <Card>
      <CardHeader>
        <BigStatLabel as="h3" id={id}>
          {name}
        </BigStatLabel>
      </CardHeader>

      <BigStatValue secondary={secondary}>{children}</BigStatValue>
    </Card>
  );
};
