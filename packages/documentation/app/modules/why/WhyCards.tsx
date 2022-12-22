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
      <div className="flex flex-row gap-4 items-center justify-between">
        <h2 className="m-0">
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
        </h2>

        <span
          className={`border border-gray-200 rounded-full text-gray-400 p-1 h-6 w-6 flex items-center transition-all ${
            expanded ? "rotate-180" : ""
          }`}
        >
          <IoChevronDownOutline aria-hidden className="mt-[2px]" />
        </span>
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
          We strongly believe in human and human rights. And we want anyone to
          be able to use the tool the way they want.
        </p>
        <p>
          In order to catch issues the sooner, the dashboard is audited by
          automated tool on every modifications.
        </p>

        <p>
          Of course, we don't have all the world's knowledge, neither the tool
          we use, and we make mistakes. So if you face any issue while browsing
          in Progressively, please,{" "}
          <a
            href="https://github.com/progressively-crew/progressively/issues/new?assignees=&labels=&template=bug_report.md&title="
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            fill an issue
          </a>{" "}
          and help us improve the tool.
        </p>
      </WhyCard>

      <WhyCard title="Progressively is self hosted">
        <p>
          Progressively is self-hosted. It means that you have to run the tool
          on your own server, on your own databases.
        </p>
        <p>
          It means that you own the data and that nobody has access to them.
        </p>
      </WhyCard>

      <WhyCard title="Progressively is Open Source">
        <p>
          <strong>
            Progressively's codebase is open source and will always be.
          </strong>
        </p>
        <p>
          We strongly believe in the power of the community, and we want to hear
          from you. Let us know your experience with the tool, how it can become
          better to solve your problems and what are your expectations for the
          future.
        </p>
      </WhyCard>

      <WhyCard title="Progressively is privacy aware">
        <p>
          As simple as it is, Progressively does not know anything about your
          users. It does not store anything related to them.
        </p>
        <p>
          And as simple as it is, we don't know anything about you, nor about
          the usage of the tool :).
        </p>
        <p>
          We don't need analytics numbers, but we need your explicit support,
          spread the word around!
        </p>
      </WhyCard>
    </div>
  );
};
