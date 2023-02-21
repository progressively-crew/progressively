import { forwardRef, useEffect, useRef, useState } from "react";

const Raw = forwardRef((props: any, ref: any) => {
  return (
    <svg
      ref={ref}
      stroke="currentColor"
      fill="#fff"
      strokeWidth="0"
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <polygon
        fill="#fffff"
        stroke="#000"
        strokeWidth="2"
        points="6 3 18 14 13 15 16 20.5 13 22 10 16 6 19"
      ></polygon>
    </svg>
  );
});
Raw.displayName = "RawCursor";

export type Step =
  | {
      name: "move";
      targetEl: string;
      sleep: number;
    }
  | {
      name: "action";
      callback: () => void;
      sleep: number;
    }
  | {
      name: "vanish";
      sleep: number;
    };

export interface CursorProps {
  steps: Array<Step>;
  shouldPlay: boolean;
}

const getEl = (selector: string) => {
  return document.querySelector(selector) as HTMLElement | null;
};

export const Cursor = ({ steps, shouldPlay }: CursorProps) => {
  const cursorRef = useRef<HTMLElement>(null);
  const [transform, setTransform] = useState("translate(0)");
  const [opacity, setOpacity] = useState(1);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!shouldPlay) return;

    const sleep = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    const play = async () => {
      for (const step of steps) {
        switch (step.name) {
          case "move": {
            const el = getEl(step.targetEl);

            if (!el) return;
            const location = el.getBoundingClientRect();
            const currentLocation = cursorRef.current?.getBoundingClientRect();

            if (!currentLocation) return;

            const newY = location.y - currentLocation.y;
            const newX =
              currentLocation.x -
              location.x -
              location.width / 2 +
              currentLocation.width / 2;

            setTransform(`translate(-${newX}px, ${newY}px)`);
            await sleep(step.sleep);
            break;
          }

          case "action": {
            await sleep(step.sleep);
            step.callback();
            break;
          }

          case "vanish": {
            setOpacity(0);
            await sleep(step.sleep);
            setIsVisible(false);
            break;
          }
        }
      }
    };

    play();
  }, [steps, shouldPlay]);

  if (!isVisible) return null;

  return (
    <Raw
      ref={cursorRef}
      className={`h-6 w-6 absolute z-30 right-2 top-2 transition-all duration-[2000ms]`}
      style={{
        transform,
        opacity,
      }}
    />
  );
};
