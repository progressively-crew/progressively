import { Card } from "./Card";
import { PricingCalculator } from "./PricingCalculator";
import { Faq } from "./Faq";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { useRef } from "react";
import { TbWorld } from "react-icons/tb";
import { GlowyLink } from "./GlowyLink";

export const PricingSection = ({ trialUrl }: { trialUrl: string }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {
    threshold: 0.6,
    freezeOnceVisible: true,
  });
  const isVisible = !!entry?.isIntersecting;

  const innerCardClass = "flex flex-row gap-4";
  const iconClass = `text-3xl`;
  const titleClass = "font-bold text-xl";
  const pClass = "text-slate-700";

  const btnClass =
    "px-6 py-2 whitespace-nowrap inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const primaryClass = "bg-gray-800 text-white hover:bg-gray-500";

  const secondaryBtnClass =
    "bg-transparent border border-slate-200 hover:bg-slate-100";

  const animationClass = isVisible ? `animate-scale-in-out` : "scale-95";

  return (
    <section className="px-4 md:px-8 max-w-screen-2xl mx-auto py-12 md:py-32">
      <h2
        className="font-extrabold text-3xl md:text-5xl pb-4 text-center"
        id="pricing"
      >
        Flexible pricing
      </h2>

      <p className="text-xl md:text-2xl leading-relaxed text-center">
        Enjoy an extraordinary <strong>14-day trial</strong> with an incredible{" "}
        <strong>1000 events</strong> included, all while
        <br /> experiencing the sheer brilliance of our fully managed service!
      </p>

      <div className="grid gap-4 px-4 md:px-8 max-w-3xl mx-auto pt-8" ref={ref}>
        <div className={`rounded-xl p-2 ${animationClass}`}>
          <Card>
            <div className={innerCardClass}>
              <TbWorld className={iconClass} />
              <div>
                <h3 className={titleClass}>Fully managed online</h3>
                <p className={pClass}>
                  Let's us manage the server and database, enjoy the tool.
                </p>
              </div>
            </div>

            <div className="py-12 px-8 my-4">
              <PricingCalculator />
            </div>

            <div className="flex justify-center">
              <GlowyLink href={trialUrl}>Start your free trial</GlowyLink>
            </div>
          </Card>
        </div>

        <div className="flex justify-center px-2">
          <a
            href="https://docs.progressively.app/start-with-self-hosted/quick-start"
            className={`${btnClass} ${secondaryBtnClass} w-full`}
          >
            Or Get started with self hosted
          </a>
        </div>
      </div>
      <div className="flex flex-col gap-4 shrink-0 pt-12 max-w-3xl mx-auto">
        <h3 className="text-white font-bold">Frequently Asked Questions</h3>
        <Faq title="What count as an event?">
          An event is a metric hit or a flag evaluation. A flag evaluation
          corresponds to the computation of{" "}
          <strong>one feature flag value</strong>. If your project contains{" "}
          <strong>3 feature flags, there will be 3 flag evaluations</strong>{" "}
          when requesting the server.
        </Faq>

        <Faq title="What happens when the events count is reached?">
          When the events count limit is reached, the users will receive the
          flag has deactivated until the next month or an upgrade of your plan.
        </Faq>

        <Faq title="Will the price change in the future?">
          The product is at an early pricing discovery stage. The pricing will
          vary in the future, <strong>for more or for less</strong> depending on
          the cost of servers and databases used under the hood. But don't
          worry, pricing changes will not be so significant and it should reach
          stability at some point.
        </Faq>
      </div>
    </section>
  );
};
