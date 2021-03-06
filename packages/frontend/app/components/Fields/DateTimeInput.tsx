import { useState } from "react";
import { styled } from "~/stitches.config";
import { Stack } from "../Stack";
import { Typography } from "../Typography";
import { Label } from "./Label";

export interface TextInputProps {
  isInvalid?: boolean;
  name: string;
  label: string;
  description?: string;
  autoComplete?: "current-password" | "username";
}

const Input = styled("input", {
  border: "4px solid $secondary",
  borderRadius: "$borderRadius$regular",
  fontSize: "$jupiter",
  padding: "$spacing$2 $spacing$4",
  display: "block",
  width: "100%",
  boxSizing: "border-box",
  maxWidth: "40ch",
});

const Hint = styled(Typography, {
  fontSize: "$uranus",
});

const InlineFields = styled("div", {
  display: "flex",
  gap: "$spacing$4",

  '& [type="date"]': {
    width: "12rem",
  },

  '& [type="time"]': {
    width: "8rem",
  },
});

const completeWithZero = (n: number) => {
  return n < 10 ? `0${n}` : String(n);
};

const getFormattedToday = () => {
  const now = new Date();

  const formattedToday = `${now.getFullYear()}-${completeWithZero(
    now.getMonth() + 1
  )}-${completeWithZero(now.getDate())}`;

  return formattedToday;
};

export const DateTimeInput = ({
  isInvalid,
  name,
  label,
  description,
}: TextInputProps) => {
  const [date, setDate] = useState(getFormattedToday());
  const [time, setTime] = useState("00:00");
  let ariaDescription: string | undefined;

  if (isInvalid) {
    ariaDescription = `error-${name}`;
  } else if (description) {
    ariaDescription = `hint-${name}`;
  }

  console.log("xxxx", date, time);
  const timestamp = date && time ? new Date(`${date} ${time}`).getTime() : null;

  return (
    <Stack spacing={2}>
      <fieldset aria-describedby={ariaDescription}>
        <Stack spacing={2}>
          <Label as="legend">{label}</Label>

          <InlineFields>
            <Input
              type="date"
              name={`date-${name}`}
              id={`date-${name}`}
              placeholder={""}
              onChange={(e) => setDate(e.target.value)}
              value={date}
            />

            <Input
              type="time"
              name={`time-${name}`}
              id={`time-${name}`}
              placeholder={"aaaa"}
              onChange={(e) => setTime(e.target.value)}
              value={time}
            />
          </InlineFields>

          <input
            type="hidden"
            name={`timestamp-${name}`}
            value={timestamp || ""}
          />

          {description && <Hint id={`hint-${name}`}>{description}</Hint>}
        </Stack>
      </fieldset>
    </Stack>
  );
};
