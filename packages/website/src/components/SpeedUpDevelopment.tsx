import { AiOutlineBug, AiOutlineDeploymentUnit } from "react-icons/ai";
import { TbBrowserCheck } from "react-icons/tb";
import { Card } from "./Card";
import { useRef } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

export const SpeedUpDevelopment = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {
    threshold: 0.75,
    freezeOnceVisible: true,
  });
  const isVisible = !!entry?.isIntersecting;

  const cardTitleClass = "font-bold text-xl pb-2";
  const iconClass = "w-10 h-10 mb-4 rounded p-2 text-white";

  const animationClass = isVisible
    ? `motion-safe:animate-fade-enter-bottom opacity-0`
    : "motion-safe:opacity-0";

  return (
    <div className="px-4 md:px-8 max-w-6xl mx-auto">
      <section className={"py-12 md:py-32"}>
        <h2 className="font-extrabold text-4xl md:text-7xl pb-4 md:text-center flex flex-col md:flex-row gap-4 md:justify-center md:items-center">
          <span>Ship 3x more, safely {isVisible}</span>{" "}
        </h2>
        <p className="text-2xl leading-relaxed md:text-center">
          Product people want features to be shipped. Developpers want to build
          things without stress. Feature flags is the missing piece to
          accomodate everyone.
        </p>

        <div className="grid md:grid-cols-3 pt-12 gap-9" ref={ref}>
          <div className={animationClass}>
            <Card>
              <AiOutlineDeploymentUnit
                className={`${iconClass} bg-indigo-500`}
                aria-hidden
              />
              <h3 className={cardTitleClass}>Iterate faster</h3>
              <p>
                Separate code deployment from feature releases. Deploy code as
                often as possible and only rollout the feature when it's ready.
              </p>
            </Card>
          </div>

          <div className={animationClass} style={{ animationDelay: "300ms" }}>
            <Card>
              <AiOutlineBug
                className={`${iconClass} bg-orange-500`}
                aria-hidden
              />
              <h3 className={cardTitleClass}>Managing risk and stress</h3>
              <p>
                If there is a bug, rollback the feature by switching a toggle.
                No need to deploy code, the feature will be disabled instantly
                for the users.
              </p>
            </Card>
          </div>

          <div className={animationClass} style={{ animationDelay: "500ms" }}>
            <Card>
              <TbBrowserCheck
                className={`${iconClass} bg-green-500`}
                aria-hidden
              />
              <h3 className={cardTitleClass}>Test the reality</h3>
              <p>
                Create a flag just for you, and test your feature directly in
                production. When you are ready, make the feature available to
                everyone.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};
