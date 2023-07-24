import { useEffect, useState } from "react";
import { NewVersion, OldVersion } from "./Browser";
import { Watch } from "./Watch";

export const TimeBasedRollout = () => {
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(5);

  useEffect(() => {
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
  }, [time]);

  return (
    <div className="bg-white">
      <div className="px-4 md:px-8 max-w-6xl mx-auto">
        <section className={"py-12 md:py-32"}>
          <h2 className="font-extrabold text-4xl md:text-7xl pb-4">
            Time based rollouts
          </h2>

          <p className="text-2xl leading-relaxed pb-4">
            Activate or deactivate your features based on date and time. Want to
            release something on Tuesday 10am PST? You can automate this.
          </p>

          <div className="grid grid-cols-[auto_1fr] gap-8 items-center">
            <Watch>
              <span className="font-mono">{`00:00:0${time}`}</span>
            </Watch>

            <div className="grid grid-cols-3 gap-4">
              {isActive ? <NewVersion /> : <OldVersion />}
              {isActive ? <NewVersion /> : <OldVersion />}
              {isActive ? <NewVersion /> : <OldVersion />}
            </div>
          </div>
          <div className="flex w-full justify-end pt-1">
            <button
              onClick={() => {
                setIsActive(false);
                setTime(3);
              }}
            >
              Reset animation
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
