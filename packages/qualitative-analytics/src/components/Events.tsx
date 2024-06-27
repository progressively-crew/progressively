import React, { useEffect, useState } from "react";
import { useEvents } from "../hooks/useEvents";
import { ProgressivelyEventSelector } from "../types";

const ElementAttached = ({ entry }: { entry: ProgressivelyEventSelector }) => {
  const [position, setPosition] = useState<
    { x: number; y: number; h: number; w: number } | undefined
  >(undefined);

  useEffect(() => {
    const domNode = document.querySelector(entry.selector);
    if (domNode) {
      const rect = domNode.getBoundingClientRect();
      setPosition({ y: rect.top, x: rect.left, h: rect.height, w: rect.width });
    }
  }, []);

  if (!position) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: position.y,
        left: position.x,
        outline: "2px solid red",
        zIndex: 9999,
        height: position.h,
        width: position.w,
      }}
    >
      <div
        style={{
          position: "relative",
          height: "100%",
          width: "100%",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: 4,
            background: "red",
            fontSize: "0.8em",
            color: "white",
          }}
        >
          {entry.eventCount}
        </div>
      </div>
    </div>
  );
};

export const Events = () => {
  const events = useEvents();

  return (
    <>
      {events.map((ev) => (
        <ElementAttached entry={ev} key={ev.selector} />
      ))}
    </>
  );
};
