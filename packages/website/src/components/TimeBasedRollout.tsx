import { useEffect, useRef, useState } from "react";
import { BrowserVersion } from "./Browser";
import { Watch } from "./Watch";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

export const TimeBasedRollout = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {
    threshold: 0.75,
    freezeOnceVisible: true,
  });
  const isVisible = !!entry?.isIntersecting;

  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(5);

  useEffect(() => {
    if (!isVisible) return;

    const timeoutId = setTimeout(() => {
      if (time > 1) {
        setTime((n) => n - 1);
      } else {
        setTime(0);
        setIsActive(true);
      }
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [time, isVisible]);

  return (
    <div>
      <div className="max-w-screen-lg mx-auto w-full">
        <p className="text-lg leading-relaxed pb-4 text-slate-500">
          Empower your feature deployment with time-based control! Seamlessly
          activate or deactivate features at your desired date and time.
          Dreaming of a Tuesday 10am PST launch? With automation at your
          fingertips, you can effortlessly make it a reality, bringing
          unprecedented convenience and precision to your feature releases!
        </p>
      </div>

      <div
        className="grid grid-cols-2 md:grid-cols-[auto_1fr] gap-8 items-center"
        ref={ref}
      >
        <Watch>
          <span className="font-mono">{`00:00:0${time}`}</span>
        </Watch>

        <div className="grid md:grid-cols-3 gap-4">
          <BrowserVersion isToggled={isActive} />
          <div className="hidden md:block">
            <BrowserVersion isToggled={isActive} />
          </div>

          <div className="hidden md:block">
            <BrowserVersion isToggled={isActive} />
          </div>
        </div>
      </div>
      <div className="flex w-full justify-end pt-1">
        <button
          onClick={() => {
            setIsActive(false);
            setTime(5);
          }}
        >
          Reset animation
        </button>
      </div>
    </div>
  );
};
