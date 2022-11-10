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
    <div className="grid md:grid-cols-[140px_1fr_auto] md:gap-x-4 gap-y-2 items-center">
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
            <h3 className="font-semibold flex flex-row items-center md:justify-end pt-4 md:pt-0">
              <span>{toolSize.name}</span>
            </h3>

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

            <div className="flex flex-row md:grid md:grid-cols-2 gap-4 items-center">
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

        <figure>
          <blockquote cite="https://www.thinkwithgoogle.com/intl/en-ca/marketing-strategies/app-and-mobile/mobile-page-speed-new-industry-benchmarks/">
            <p className="text-center text-gray-200 p-4 md:px-16 md:text-xl lg:text-2xl before:content-['\201C'] after:content-['\201D']">
              As page load time goes from <strong>one second</strong> to{" "}
              <strong>seven seconds</strong>, the probability of a mobile site
              visitor <strong>bouncing increases 113%</strong>.
            </p>
          </blockquote>
          <figcaption className="text-center">
            —{" "}
            <a
              href="https://www.thinkwithgoogle.com/intl/en-ca/marketing-strategies/app-and-mobile/mobile-page-speed-new-industry-benchmarks/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              ThinkwithGoogle
            </a>
          </figcaption>
        </figure>

        <div className="max-w-screen-md mx-auto pt-4 md:pt-12">
          <PerfGrid />

          <div className="pt-6 md:pt-16">
            <p className="text-center text-gray-200 text-xs">
              Approximative numbers from the{" "}
              <a
                href="https://github.com/progressively-crew/progressively/tree/master/example/bundle-diffs"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Bundle diff example Nextjs project{" "}
              </a>
              . Download time is calculated on the basis of{" "}
              <strong>50kb/s</strong> for slow mobile and{" "}
              <strong>875kB/s</strong> for high speed connections.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
