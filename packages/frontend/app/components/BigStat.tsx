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
  name?: string;
  id?: string;
  unit?: string;
  count: number;
  description?: string;
  ratio?: string;
}

export const BigStat = ({ name, count, id, unit, ratio }: BigStatProps) => {
  const formatterRef = useRef(new Intl.NumberFormat());

  return (
    <div>
      {name && (
        <Typography
          as="h2"
          id={id}
          textTransform="uppercase"
          color="hadesLight"
          size="neptune"
        >
          {name}
        </Typography>
      )}

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
        {ratio && (
          <Typography color="successFg" size="neptune" as="span">
            {ratio}
          </Typography>
        )}
      </BigStatValue>
    </div>
  );
};
