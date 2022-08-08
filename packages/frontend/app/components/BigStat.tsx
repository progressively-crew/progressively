import { styled } from "~/stitches.config";
import { Card, CardContent, CardHeader } from "./Card";
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
    fontSize: "$venus",
    lineHeight: "unset",
    color: "$nemesis",
    borderBottom: "3px solid $nemesis",
  },

  variants: {
    secondary: {
      true: {
        "& p": {
          color: "$hades",
          borderBottom: "3px dashed $hades",
        },
      },
    },
  },
});

export interface BigStatProps {
  children: React.ReactNode;
  name: string;
  id?: string;
  secondary?: boolean;
}

export const BigStat = ({ name, children, id, secondary }: BigStatProps) => {
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
