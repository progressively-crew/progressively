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
    <div>
      <div className="max-w-screen-lg mx-auto w-full">
        <p className="text-lg leading-relaxed pb-8 text-slate-500">
          Accelerate feedback acquisition by establishing exclusive user groups
          with specialized and controlled access to your cutting-edge features.
          Leverage their invaluable insights to fine-tune your offerings even
          before their widespread release, ensuring a remarkable user experience
          for all!
        </p>
      </div>

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
    </div>
  );
};
