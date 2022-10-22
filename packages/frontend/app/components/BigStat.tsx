import { useRef } from "react";
import { styled } from "~/stitches.config";
import { HStack } from "./HStack";
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
}

export const BigStat = ({ name, count, id, unit }: BigStatProps) => {
  const formatterRef = useRef(
    new Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 1,
    })
  );

  return (
    <div>
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
            <Typography
              font="title"
              as="span"
              color="hadesLight"
              fontWeight="semiBold"
            >
              {unit}
            </Typography>
          )}
        </HStack>
      </BigStatValue>
    </div>
  );
};
