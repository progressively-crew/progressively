import { useSearchParams } from "@remix-run/react";
import { Example } from "~/components/Example";

export const ExampleSection = () => {
  const [searchParams] = useSearchParams();

  const variant = searchParams.get("variant") || "Control";

  return (
    <div className="flex flex-col lg:flex-row gap-16 items-center">
      <div className="flex-1">
        <h2 className="font-semibold pt-2 text-4xl lg:text-6xl">
          Deploy whenever <br /> you want
        </h2>

        {variant === "Control" && (
          <p className="pt-2 md:pt-4 text-gray-600 text-2xl">
            Experience the evolution of deployments with progressive rollouts,
            using the precision of percentages to pave the way for a smoother
            launch.
          </p>
        )}

        {variant === "A" && (
          <p className="pt-2 md:pt-4 text-gray-600 text-2xl">
            Step into the future of deployments with the flexibility of
            percentage-based progressive rollouts, perfecting your launch one
            percentage at a time.
          </p>
        )}

        {variant === "B" && (
          <p className="pt-2 md:pt-4 text-gray-600 text-2xl">
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
