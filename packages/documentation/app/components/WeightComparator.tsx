import React from "react";
import { AiOutlineDesktop, AiOutlineMobile } from "react-icons/ai";

const toolSizes = [
  {
    name: "Progressively",
    weight: 1300,
  },
  {
    name: "Growthbook",
    weight: 3800,
  },
  {
    name: "Launchdarkly",
    weight: 21000,
  },
  {
    name: "Flagship.io",
    weight: 46000,
  },
];

const Maxima = 46000;
const SlowKbDownload = 5000;
const HighKbDownload = 875000;

const PerfGrid = () => {
  return (
    <div className="grid grid-cols-[120px_1fr_auto] gap-2 pt-12 items-center max-w-screen-md mx-auto">
      {toolSizes.map((toolSize) => {
        const percentageSize = (toolSize.weight / Maxima) * 100;

        const color =
          toolSize.name === "Progressively"
            ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
            : "bg-gray-700";

        const timeOnSlow = Math.ceil((toolSize.weight / SlowKbDownload) * 100);

        const timeOnFast = Math.ceil((toolSize.weight / HighKbDownload) * 100);

        return (
          <React.Fragment key={toolSize.name}>
            <h3 className="font-semibold">{toolSize.name}</h3>

            <div className="border border-gray-600 overflow-hidden rounded p-1 pr-4">
              <div className="flex flex-row gap-4 items-center">
                <div
                  className={"h-8 rounded-sm " + color}
                  style={{ width: `${percentageSize}%` }}
                />
                <div className="flex shrink-0 flex-row gap-4">
                  <span>
                    {toolSize.weight / 1000}{" "}
                    <span className="text-gray-400 text-xs">kB</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 items-center">
              <span className="flex flex-row gap-1 items-center">
                <AiOutlineMobile />
                <span className="text-sm">
                  {timeOnSlow} <span className="text-gray-300 text-xs">ms</span>
                </span>
              </span>
              <span className="flex flex-row gap-1 items-center">
                <AiOutlineDesktop />
                <span className="text-sm">
                  {timeOnFast} <span className="text-gray-300 text-xs">ms</span>
                </span>
              </span>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export const WeightComparator = () => {
  return (
    <div className="bg-gray-900 text-white">
      <section className="max-w-screen-xl mx-auto px-4 py-12 md:p-20">
        <h2 className="text-center text-3xl md:text-5xl font-bold">
          <span className="text-pink-500">Weight</span> difference
        </h2>

        <p className="text-center pt-4 text-gray-200 p-4 md:px-16 md:text-xl lg:text-2xl">
          Start building your feature, merge the changes, and progressively
          rollout these changes to your audience. If you encounter unexpected
          errors, you can simply rollback as easily as you rolled out.
        </p>

        <PerfGrid />

        <p className="text-center pt-4 text-gray-200 p-4 md:px-16 md:text-xl lg:text-2xl pt-12">
          Start building your feature, merge the changes, and progressively
          rollout these changes to your audience. If you encounter unexpected
          errors, you can simply rollback as easily as you rolled out.
        </p>
      </section>
    </div>
  );
};
