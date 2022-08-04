import { useState } from "react";
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
    <Stack>
      <fieldset aria-describedby={ariaDescription}>
        <Stack>
          <Label as="legend">{label}</Label>

          <div>
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
          </div>

          <input
            type="hidden"
            name={`timestamp-${name}`}
            value={timestamp || ""}
          />

          {description && (
            <Typography id={`hint-${name}`}>{description}</Typography>
          )}
        </Stack>
      </fieldset>
    </Stack>
  );
};
