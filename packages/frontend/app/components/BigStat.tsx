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

  variants: {
    type: {
      variant: {
        color: "$successFg",
        borderBottom: "20px solid red",
      },
    },
  },
});

export interface BigStatProps {
  name: string;
  id?: string;
  unit?: string;
  count: number;
  type?: "variant";
}

export const BigStat = ({ name, count, id, unit, type }: BigStatProps) => {
  const formatterRef = useRef(
    new Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 1,
    })
  );

  console.log("looo", type);

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

      <BigStatValue type={type}>
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
