import { useEffect, useState } from "react";
import { styled, keyframes } from "~/stitches.config";

const ringAnimation = keyframes({
  "10%, 90%": {
    transform: "translate3d(-1px, 0, 0)",
  },

  "20%, 80%": {
    transform: "translate3d(2px, 0, 0)",
  },

  "30%, 50%, 70%": {
    transform: "translate3d(-4px, 0, 0)",
  },

  "40%, 60%": {
    transform: "translate3d(4px, 0, 0)",
  },
});

const ClockWrapper = styled("div", {
  height: 24,
  width: 24,
  border: "3px solid $nemesis",
  borderRadius: "50%",
  position: "relative",

  "& .hand": {
    position: "absolute",
    top: "50%",
    transformOrigin: "center top",
  },

  "& .hour ": {
    left: "46%",
    width: "10%",
    height: "25%",
    backgroundColor: "$nemesis",
    transform: "rotate(var(--initial-rotation-hour))",
  },

  "& .minute": {
    left: "46%",
    width: "10%",
    height: "40%",
    backgroundColor: "$nemesis",
    transform: "rotate(var(--initial-rotation-minutes))",
  },

  variants: {
    isRinging: {
      true: {
        animation: `${ringAnimation} 1s forwards`,
        border: "3px solid $errorFg",
        "& .hour ": {
          background: "$errorFg",
        },
        "& .minute ": {
          background: "$errorFg",
        },
      },
    },
  },
});

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
    <ClockWrapper isRinging={ringing && ringable}>
      <div className="hand hour" style={hourStyle} />
      <div className="hand minute" style={minuteStyle} />
    </ClockWrapper>
  );
};
