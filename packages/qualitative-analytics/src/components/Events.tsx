import React, { useEffect, useState } from "react";
import { useEvents } from "../hooks/useEvents";
import { ProgressivelyEventSelector } from "../types";
import { getPointColor } from "../utils/getPointColor";
import { executeWhenEl } from "../utils/executeWhenEl";

const ElementAttached = ({
  entry,
  ratio,
}: {
  entry: ProgressivelyEventSelector;
  ratio: number;
}) => {
  const [position, setPosition] = useState<
    { x: number; y: number; h: number; w: number } | undefined
  >(undefined);

  useEffect(() => {
    const update = () => {
      executeWhenEl(entry.selector, (el) => {
        const rect = el.getBoundingClientRect();
        setPosition({
          y: rect.top + window.scrollY,
          x: rect.left + window.scrollX,
          h: rect.height,
          w: rect.width,
        });
      });
    };

    update();

    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("resize", update);
    };
  }, [entry.selector]);

  if (!position) return null;

  const pointColor = getPointColor(ratio);

  return (
    <div
      style={{
        position: "absolute",
        top: position.y,
        left: position.x,
        outline: `2px solid ${pointColor}`,
        zIndex: 9999,
        height: position.h,
        width: position.w,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "relative",
          height: "100%",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: 4,
            background: pointColor,
            fontSize: "0.8em",
            color: "black",
          }}
        >
          {entry.eventCount}
        </div>
      </div>
    </div>
  );
};

export const Events = () => {
  const { events, totalEvents } = useEvents();

  return (
    <>
      {events.map((ev) => (
        <ElementAttached
          entry={ev}
          key={ev.selector}
          ratio={ev.eventCount / totalEvents}
        />
      ))}
    </>
  );
};
