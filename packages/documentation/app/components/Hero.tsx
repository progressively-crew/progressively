import { Button } from "./Button";

const Catchphrase = () => {
  return (
    <p className="mt-4 max-w-xl sm:text-2xl sm:leading-relaxed text-gray-600 dark:text-slate-200">
      A simple, accessible, lightweight, self-hosted and OpenSource{" "}
      <strong>feature flagging tool</strong>.
    </p>
  );
};

export const Hero = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-0 py-12 md:py-56 w-full">
      <div>
        <h1 className="text-black text-3xl dark:text-white font-extrabold sm:text-6xl p-1">
          Rollout quickly, effectively,
          <span className="sm:block dark:text-indigo-400 text-indigo-700">
            {" "}
            Progressively.{" "}
          </span>
        </h1>

        <Catchphrase />

        <div className="mt-8 flex flex-wrap gap-4">
          <Button href="https://progressively.gitbook.io/docs/" size="L">
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};
