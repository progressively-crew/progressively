import { Logo } from "./Logo";
import { Button } from "./Button";

const Catchphrase = () => {
  return (
    <p className="mt-4 max-w-xl sm:text-xl sm:leading-relaxed text-gray-600 dark:text-slate-200">
      A simple, accessible, lightweight, self-hosted and OpenSource{" "}
      <strong>feature flagging tool</strong>.
    </p>
  );
};

export const Hero = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-0 py-12 md:py-32 w-full grid md:grid-cols-[3fr_2fr] gap-8">
      <div>
        <div className="md:pb-8">
          <Logo className="h-16 w-16" />
        </div>

        <h1 className="text-black text-3xl dark:text-white font-extrabold sm:text-5xl p-1 motion-safe:animate-fade-enter-top">
          Rollout quickly, effectively,
          <span className="sm:block dark:text-indigo-400 text-indigo-700">
            {" "}
            Progressively.{" "}
          </span>
        </h1>

        <div
          className="motion-safe:animate-fade-enter-bottom motion-safe:opacity-0"
          style={{
            animationDelay: "500ms",
          }}
        >
          <Catchphrase />

          <div className="mt-8 flex flex-wrap gap-4">
            <Button to="/docs/introduction/getting-started">Get Started</Button>

            <Button variant="secondary" to="/demo-instance">
              Demo instance
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
