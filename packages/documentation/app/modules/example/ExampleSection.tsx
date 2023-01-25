import { useFlags } from "@progressively/react";
import { Example } from "~/components/Example";

export const ExampleSection = () => {
  const { flags } = useFlags();

  return (
    <div className="flex flex-row gap-4 items-center">
      <div className="flex-1">
        <h3 className="font-bold pt-2 text-6xl dark:text-slate-100">
          Deploy whenever <br /> you want
        </h3>

        {flags.deploySection === "Control" && (
          <p className="pt-2 md:pt-4 text-gray-600 dark:text-slate-200 text-2xl">
            Experience the evolution of deployments with progressive rollouts,
            using the precision of percentages to pave the way for a smoother
            launch.
          </p>
        )}

        {flags.deploySection === "A" && (
          <p className="pt-2 md:pt-4 text-gray-600 dark:text-slate-200 text-2xl">
            Step into the future of deployments with the flexibility of
            percentage-based progressive rollouts, perfecting your launch one
            percentage at a time.
          </p>
        )}

        {flags.deploySection === "B" && (
          <p className="pt-2 md:pt-4 text-gray-600 dark:text-slate-200 text-2xl">
            Revolutionize your deployments with the precision of progressive
            rollouts, using the power of percentages to pave the way for a
            successful launch.
          </p>
        )}
      </div>

      <div className="flex-1">
        <Example />
      </div>
    </div>
  );
};
