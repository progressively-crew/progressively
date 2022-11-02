import { useState } from "react";
import { HStack } from "../HStack";
import { Stack } from "../Stack";
import { Label } from "./Label";

export interface TextInputProps {
  isInvalid?: boolean;
  name: string;
  label: string;
  description?: string;
  autoComplete?: "current-password" | "username";
}

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

          <div>
            <HStack spacing={4} direction={{ "@mobile": "column" }}>
              <input
                type="date"
                name={`date-${name}`}
                id={`date-${name}`}
                placeholder={""}
                onChange={(e) => setDate(e.target.value)}
                value={date}
              />

              <input
                type="time"
                name={`time-${name}`}
                id={`time-${name}`}
                placeholder={"aaaa"}
                onChange={(e) => setTime(e.target.value)}
                value={time}
              />
            </HStack>
          </div>

          <input type="hidden" name={`utc-${name}`} value={utc || ""} />

          {description && <p id={`hint-${name}`}>{description}</p>}
        </Stack>
      </fieldset>
    </Stack>
  );
};
