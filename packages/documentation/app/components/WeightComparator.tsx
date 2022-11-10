import React from "react";

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

export const WeightComparator = () => {
  return (
    <div className="bg-gray-900 text-white">
      <section className="max-w-screen-xl mx-auto px-4 py-12 md:p-20">
        <h2 className="text-center text-3xl md:text-5xl font-bold">
          <span className="text-pink-500">Weight</span> difference
        </h2>

        <div className="grid grid-cols-[120px_1fr] gap-2 pt-12 items-center max-w-screen-md mx-auto">
          {toolSizes.map((toolSize) => {
            const percentageSize = (toolSize.weight / Maxima) * 100;

            const color =
              toolSize.name === "Progressively"
                ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                : "bg-gray-700";

            const timeOnSlow = (
              (toolSize.weight / SlowKbDownload) *
              100
            ).toFixed(2);

            return (
              <React.Fragment key={toolSize.name}>
                <h3 className="font-semibold">{toolSize.name}</h3>

                <div className="border border-gray-600 overflow-hidden rounded p-1 pr-4">
                  <div className="flex flex-row gap-4 items-center">
                    <div
                      className={"h-8 rounded-sm " + color}
                      style={{ width: `${percentageSize}%` }}
                    />
                    <div>
                      {toolSize.weight / 1000}kB {timeOnSlow}Ms
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </section>
    </div>
  );
};
