import { useEffect, useState } from "react";
import { NewVersion, OldVersion } from "./Browser";

export const TimeBasedRollout = () => {
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(3);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (time > 1) {
        setTime((n) => n - 1);
      } else {
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
            Create multiple variants for a given feature flag and provide
            different experiences to your users. Measure the impact of the
            different versions and makes decisions to improve your apps.
          </p>

          <div className="grid grid-cols-[1fr_2fr] gap-8 items-center">
            <div className="text-center font-extrabold text-7xl">{time}</div>

            <div className="grid grid-cols-3 gap-4">
              {isActive ? <NewVersion /> : <OldVersion />}
              {isActive ? <NewVersion /> : <OldVersion />}
              {isActive ? <NewVersion /> : <OldVersion />}
            </div>
          </div>
          <div className="flex w-full justify-end pt-4">
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
