import { useRef } from "react";
import { MdBubbleChart } from "react-icons/md";
import { styled } from "~/stitches.config";
import { Card, CardContent } from "./Card";
import { HStack } from "./HStack";
import { Spacer } from "./Spacer";
import { Typography } from "./Typography";

const BigStatValue = styled("p", {
  fontFamily: "$default",
  display: "inline",
  fontSize: "$venus",
  lineHeight: "unset",
  color: "$nemesis",
  fontWeight: "$bold",
});

export interface BigStatProps {
  name: string;
  id?: string;
  unit?: string;
  count: number;
  description?: string;
}

export const BigStat = ({ name, count, id, unit }: BigStatProps) => {
  const formatterRef = useRef(new Intl.NumberFormat());

  return (
    <Card>
      <CardContent>
        <Typography
          as="h2"
          id={id}
          textTransform="uppercase"
          color="hadesLight"
          size="neptune"
        >
          {name}
        </Typography>

        <BigStatValue>
          <HStack alignItems="flex-end" as="span">
            {formatterRef.current.format(count)}{" "}
            {unit && (
              <Typography font="title" as="span" color="hadesLight">
                {unit}
              </Typography>
            )}
          </HStack>
        </BigStatValue>
      </CardContent>
    </Card>
  );
};
