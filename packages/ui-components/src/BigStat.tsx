import { useRef } from "react";
import { styled } from "./stitches.config";
import { Card, CardContent } from "./Card";
import { HStack } from "./HStack";
import { Typography } from "./Typography";

const BigStatLabel = styled(Typography, {
  "& h3": {
    lineHeight: "unset",
  },
});
const BigStatValue = styled("p", {
  fontFamily: "$default",

  display: "inline",
  fontSize: "$venus",
  lineHeight: "unset",
  color: "$nemesis",
});

export interface BigStatProps {
  name: string;
  id?: string;
  unit?: string;
  count: number;
}

export const BigStat = ({ name, count, id, unit }: BigStatProps) => {
  const formatterRef = useRef(new Intl.NumberFormat());

  return (
    <Card>
      <CardContent>
        <BigStatLabel as="h2" id={id}>
          {name}
        </BigStatLabel>

        <BigStatValue>
          <HStack alignItems="flex-end" as="span">
            {formatterRef.current.format(count)}{" "}
            {unit && (
              <Typography font="title" as="span">
                {unit}
              </Typography>
            )}
          </HStack>
        </BigStatValue>
      </CardContent>
    </Card>
  );
};
