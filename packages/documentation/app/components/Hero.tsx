import { Logo } from "./Logo";
import { useFlags } from "@progressively/react";
import { Button } from "./Button";
import { Example } from "./Example";

export const Hero = () => {
  const { track } = useFlags();

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-0 py-12 md:py-32 w-full grid md:grid-cols-[3fr_2fr] gap-8">
      <div>
        <div className="md:pb-8">
          <Logo className="h-16 w-16" />
        </div>

        <h1 className="text-black text-3xl dark:text-white font-extrabold sm:text-5xl p-1">
          Rollout quickly, effectively,
          <span className="sm:block dark:text-indigo-400 text-indigo-700">
            {" "}
            Progressively.{" "}
          </span>
        </h1>

        <p className="mt-4 max-w-xl sm:text-xl sm:leading-relaxed text-gray-600 dark:text-slate-200">
          A simple, accessible, lightweight, self-hosted and OpenSource{" "}
          <strong>feature flagging tool</strong>.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Button
            to="/docs/introduction/why"
            onClick={() => track("Get started A", {})}
          >
            Get Started
          </Button>

          <Button variant="secondary" to="/docs/introduction/demo-instance">
            Demo instance
          </Button>
        </div>
      </div>

      <Example />
    </div>
  );
};
