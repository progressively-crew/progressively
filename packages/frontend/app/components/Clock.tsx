import { useEffect, useState } from "react";

export interface ClockProps {
  date: Date;
  ringable: boolean;
}

const InitialRotationMinutes = 180;

export const Clock = ({ date, ringable }: ClockProps) => {
  const [ringing, setRinging] = useState(false);

  const hour = date.getHours();
  const hourDegree = ((hour - 12) / 12) * 360;

  const minutes = date.getMinutes();
  const minutesDegree = (minutes / 60) * 360;

  const hourStyle = {
    "--initial-rotation-hour": `${InitialRotationMinutes + hourDegree}deg`,
  } as React.CSSProperties;

  const minuteStyle = {
    "--initial-rotation-minutes": `${
      InitialRotationMinutes + minutesDegree
    }deg`,
  } as React.CSSProperties;

  useEffect(() => {
    if (!ringable) return;

    const intervalId = setInterval(() => {
      if (Date.now() > date.getTime()) {
        setRinging(true);
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [date, ringable]);

  return (
    <div>
      <div className="hand hour" style={hourStyle} />
      <div className="hand minute" style={minuteStyle} />
    </div>
  );
};
