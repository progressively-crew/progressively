import { useId, useRef, useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";

interface WhyCardProps {
  title: string;
  children: React.ReactNode;
}
const WhyCard = ({ title, children }: WhyCardProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [expanded, setExpanded] = useState(false);
  const id = useId();
  const triggerId = `trigger-${id}`;
  const sectionId = `section-${id}`;

  const toggle = () => setExpanded((s) => !s);

  return (
    <div
      className="relative z-10 bg-white hover:bg-gray-50 active:bg-gray-100 dark:bg-slate-800 dark:hover:bg-slate-700 dark:active:bg-slate-600 rounded p-4 drop-shadow cursor-pointer"
      tabIndex={-1}
      onClick={() => buttonRef?.current?.click()}
    >
      <div className="flex flex-row gap-4 items-center">
        <span
          className={`border border-gray-200 rounded-full text-gray-400 p-1 h-6 w-6 flex items-center transition-all ${
            expanded ? "rotate-180" : ""
          }`}
        >
          <IoChevronDownOutline aria-hidden className="mt-[2px]" />
        </span>

        <h3 className="m-0">
          <button
            ref={buttonRef}
            className="text-base font-semibold mb-0"
            onClick={(e) => {
              e.stopPropagation();
              toggle();
            }}
            id={triggerId}
            aria-controls={sectionId}
            aria-expanded={expanded}
          >
            <span className="!text-indigo-700 dark:!text-slate-100">
              {title}
            </span>
          </button>
        </h3>
      </div>

      <div
        id={sectionId}
        role="region"
        aria-labelledby={triggerId}
        className="text-gray-600 dark:text-slate-300 text-sm dark:text-slate-100"
        hidden={!expanded}
      >
        {children}
      </div>
    </div>
  );
};

export const WhyCards = () => {
  return (
    <div className="flex gap-4 flex-col">
      <WhyCard title="Progressively is smaller than its competitors">
        <p>
          Third party tools used on the frontend are known to slow down websites
          and applications. Having heavy libraries means there is more code to
          download, parse and execute in the browser.{" "}
        </p>
        <p>
          By shifting most of the computations to the server, Progressively is
          order of magnitude smaller than its competitors.
        </p>
        <p>
          According to Bundlephobia (
          <a
            href="https://bundlephobia.com/package/@progressively/react@0.0.1-alpha.19"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            Progressively
          </a>
          ,{" "}
          <a
            href="https://bundlephobia.com/package/launchdarkly-react-client-sdk@3.0.1"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            LaunchDarkly
          </a>
          ), Progressively is{" "}
          <strong className="text-pink-600">20x smaller</strong> than
          LaunchDarkly concerning the React SDK.
        </p>
        <p>
          And if you prefer to see the comparison in a real NextJs application,
          you can check the{" "}
          <a
            href="https://github.com/progressively-crew/progressively/tree/master/example/bundle-diffs"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            bundle-diff example
          </a>{" "}
          available in the Github repository.
        </p>
      </WhyCard>

      <WhyCard title="Progressively has to be accessible">
        <p>
          Progressively is smaller than its competitor by moving most of the
          logic on the server. It does not bloat client side bundles.
        </p>
      </WhyCard>

      <WhyCard title="Progressively is self hosted">
        <p>
          Progressively is smaller than its competitor by moving most of the
          logic on the server. It does not bloat client side bundles.
        </p>
      </WhyCard>

      <WhyCard title="Progressively is Open Source">
        <p>
          Progressively is smaller than its competitor by moving most of the
          logic on the server. It does not bloat client side bundles.
        </p>
      </WhyCard>

      <WhyCard title="Progressively is privacy aware">
        <p>
          Progressively is smaller than its competitor by moving most of the
          logic on the server. It does not bloat client side bundles.
        </p>
      </WhyCard>
    </div>
  );
};
