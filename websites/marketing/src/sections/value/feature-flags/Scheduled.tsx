import { useEffect, useState } from "react";
import { BannerBrowser, EmptyBanner, SingleVariant } from "./BannerBrowser";

export const Scheduled = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [seconds, setSeconds] = useState(3);

  useEffect(() => {
    if (!isStarted) return;
    if (seconds > 0) {
      const timerId = setTimeout(() => {
        setSeconds((s) => s - 1);
      }, 1000);

      return () => {
        clearTimeout(timerId);
      };
    }
  }, [seconds, isStarted]);

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="grid grid-cols-2 gap-4 w-full">
        <BannerBrowser
          banner={seconds === 0 ? <SingleVariant /> : <EmptyBanner />}
        />
        <BannerBrowser
          banner={seconds === 0 ? <SingleVariant /> : <EmptyBanner />}
        />
      </div>

      <div className="flex flex-row gap-4 items-center h-10">
        <div className="text-xl font-mono">00:00:0{seconds}</div>
        <div>
          <button
            className="rounded-full border border-indigo-600 text-indigo-600 py-1 px-4"
            onClick={() => (isStarted ? setSeconds(3) : setIsStarted(true))}
          >
            {isStarted ? "Reset" : "Start timer"}
          </button>
        </div>
      </div>
    </div>
  );
};
