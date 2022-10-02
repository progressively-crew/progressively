import { useState } from "react";
import { styled } from "~/stitches.config";
import { HStack } from "../HStack";
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
  border: "1px solid $border",
  borderRadius: "$borderRadius$regular",
  fontSize: "$uranus",
  fontFamily: "$default",
  height: "$cta",
  padding: "0 $spacing$4",
  display: "block",
  width: "100%",
  boxSizing: "border-box",
  maxWidth: "40ch",
});

const Hint = styled(Typography, {
  fontSize: "$uranus",
});

const FieldsWrapper = styled("div", {
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

  return `${now.getFullYear()}-${completeWithZero(
    now.getMonth() + 1
  )}-${completeWithZero(now.getDate())}`;
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

  let utc: string | null;

  if (date && time) {
    const [hours, minutes] = time.split(":");
    const d = new Date(date);

    try {
      d.setHours(Number(hours));
      d.setMinutes(Number(minutes));
      utc = d.toISOString();
    } catch {
      // silently swallow
    }
  }

  return (
    <Stack spacing={2}>
      <fieldset aria-describedby={ariaDescription}>
        <Stack spacing={2}>
          <Label as="legend">{label}</Label>

          <FieldsWrapper>
            <HStack spacing={4}>
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
            </HStack>
          </FieldsWrapper>

          <input type="hidden" name={`utc-${name}`} value={utc || ""} />

          {description && <Hint id={`hint-${name}`}>{description}</Hint>}
        </Stack>
      </fieldset>
    </Stack>
  );
};
