import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { Card } from "./Card";
import { NewVersion, OldVersion } from "./Browser";
import { useRef } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

export const CanaryRelease = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {
    threshold: 0.75,
    freezeOnceVisible: true,
  });
  const isVisible = !!entry?.isIntersecting;

  const animationClass = isVisible
    ? `animate-fade-enter-bottom opacity-0`
    : "opacity-0";

  const innerCardClass = "flex flex-row gap-4 pb-4";
  const successIconClass = `text-3xl text-emerald-600`;
  const errorIconClass = `text-3xl text-red-600`;
  const titleClass = "font-bold text-xl";
  const pClass = "text-slate-700";

  return (
    <div className="px-4 md:px-8 max-w-6xl mx-auto">
      <section className={"py-12 md:py-32"}>
        <h2 className="font-extrabold text-4xl md:text-7xl pb-4">
          Unlock Canary & Beta versions.
        </h2>

        <p className="text-2xl leading-relaxed pb-8">
          Create user segments and audience targeting rules to only activate
          your features to a subset of your audience, unlocking QA testing in
          production, Canary and Beta versions.
        </p>

        <div className="grid md:grid-cols-3 gap-4" ref={ref}>
          <div className={animationClass}>
            <Card>
              <div className={innerCardClass}>
                <AiOutlineCheckCircle className={successIconClass} />
                <div>
                  <h3 className={titleClass}>QA team</h3>
                  <p className={pClass}>
                    They can see the content behind the flag.
                  </p>
                </div>
              </div>

              <NewVersion />
            </Card>
          </div>

          <div className={animationClass} style={{ animationDelay: "300ms" }}>
            <Card>
              <div className={innerCardClass}>
                <AiOutlineCheckCircle className={successIconClass} />
                <div>
                  <h3 className={titleClass}>Canary users</h3>
                  <p className={pClass}>
                    They can see the content behind the flag.
                  </p>
                </div>
              </div>

              <NewVersion />
            </Card>
          </div>

          <div className={animationClass} style={{ animationDelay: "500ms" }}>
            <Card>
              <div className={innerCardClass}>
                <AiOutlineCloseCircle className={errorIconClass} />
                <div>
                  <h3 className={titleClass}>Beta users</h3>
                  <p className={pClass}>
                    Too early to give them access, they won't see the content.
                  </p>
                </div>
              </div>

              <OldVersion />
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};
