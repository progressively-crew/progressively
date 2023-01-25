import React from "react";
import { Md3GMobiledata, Md4GMobiledata } from "react-icons/md";
import { VisuallyHidden } from "./VisuallyHidden";

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
    name: "Unleash (React)",
    weight: 11000,
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

// Picked up from http://www.webpagetest.org/
// Speed in KB/s
const DownloadSpeed = {
  THREE_G: 400 / 8, // Slow 3G
  FOUR_G: 7000 / 8, // 4G
  DESKTOP: 40000 / 8,
};
const getTimeFromSize = (sizeInBytes: number) => {
  return {
    threeG: sizeInBytes / 1024 / DownloadSpeed.THREE_G,
    fourG: sizeInBytes / 1024 / DownloadSpeed.FOUR_G,
    desktop: sizeInBytes / 1024 / DownloadSpeed.DESKTOP,
  };
};

const formatTime = (value: number) => {
  let unit, size;
  if (value < 0.0005) {
    unit = "μs";
    size = Math.round(value * 1000000);
  } else if (value < 0.5) {
    unit = "ms";
    size = Math.round(value * 1000);
  } else {
    unit = "s";
    size = value.toFixed(2);
  }

  return { unit, size };
};

const PerfGrid = () => {
  return (
    <div className="grid md:grid-cols-[140px_1fr_auto] md:gap-x-4 gap-y-2 items-center">
      {toolSizes.map((toolSize) => {
        const percentageSize = (toolSize.weight / Maxima) * 100;

        const color =
          toolSize.name === "Progressively"
            ? "bg-indigo-500"
            : "bg-gray-300 dark:bg-slate-600";

        const size = getTimeFromSize(toolSize.weight);
        const threeG = formatTime(size.threeG);
        const fourG = formatTime(size.fourG);
        const desktop = formatTime(size.desktop);

        return (
          <React.Fragment key={toolSize.name}>
            <h3 className="font-semibold flex flex-row items-center md:justify-end pt-4 md:pt-0 dark:text-slate-200">
              <span>{toolSize.name}</span>
            </h3>

            <div className="border border-gray-300 dark:border-slate-600 rounded p-1 pr-4 drop-shadow-md">
              <div className="flex flex-row gap-4 items-center">
                <div
                  className={"h-8 rounded-sm " + color}
                  style={{ width: `${percentageSize}%` }}
                />
                <div className="flex shrink-0 flex-row gap-4 dark:text-slate-200">
                  <VisuallyHidden>
                    {`Size of ${toolSize.name}: ${toolSize.weight / 1000}kB`}
                  </VisuallyHidden>

                  <span aria-hidden>
                    {toolSize.weight / 1000}{" "}
                    <span className="text-gray-700 dark:text-slate-400 text-xs">
                      kB
                    </span>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-row md:grid md:grid-cols-2 gap-4 items-center">
              <span className="flex flex-row gap-1 items-center">
                <Md3GMobiledata aria-hidden className="text-indigo-700" />
                <VisuallyHidden>
                  {`Time to download ${toolSize.name} on 3G: ${threeG.size}
                  ${threeG.unit}`}
                </VisuallyHidden>

                <span className="text-sm dark:text-slate-200" aria-hidden>
                  {threeG.size}{" "}
                  <span className="text-gray-700 text-xs dark:text-slate-400">
                    {threeG.unit}
                  </span>
                </span>
              </span>

              <span className="flex flex-row gap-1 items-center">
                <Md4GMobiledata aria-hidden className="text-indigo-700" />
                <VisuallyHidden>
                  {`Time to download ${toolSize.name} on 3G: ${fourG.size}
                  ${fourG.unit}`}
                </VisuallyHidden>

                <span className="text-sm dark:text-slate-200" aria-hidden>
                  {fourG.size}{" "}
                  <span className="text-gray-700 dark:text-slate-400 text-xs">
                    {fourG.unit}
                  </span>
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
    <section>
      <h2 className="text-center text-3xl md:text-6xl font-semibold dark:text-white">
        Performance difference
      </h2>

      <figure>
        <blockquote cite="https://www.thinkwithgoogle.com/intl/en-ca/marketing-strategies/app-and-mobile/mobile-page-speed-new-industry-benchmarks/">
          <p className="text-center text-gray-700 dark:text-slate-200 p-4 md:px-16 md:text-xl lg:text-2xl before:content-['\201C'] after:content-['\201D']">
            As page load time goes from <strong>one second</strong> to{" "}
            <strong>seven seconds</strong>, the probability of a mobile site
            visitor <strong>bouncing increases 113%</strong>.
          </p>
        </blockquote>
        <figcaption className="text-center dark:text-slate-200">
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

      <div className="max-w-screen-xl mx-auto pt-4 md:pt-8">
        <PerfGrid />

        <div className="pt-6">
          <p className="text-center text-gray-700 text-xs dark:text-slate-200">
            Approximative numbers from the{" "}
            <a
              href="https://github.com/progressively-crew/progressively/tree/master/example/bundle-diffs"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Bundle diff example Nextjs project{" "}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};
