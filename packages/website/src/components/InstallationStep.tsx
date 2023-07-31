import { AiOutlineUserAdd } from "react-icons/ai";
import { Card } from "./Card";
import { TbSdk } from "react-icons/tb";
import { FaToggleOff } from "react-icons/fa";
import { GoChevronRight } from "react-icons/go";
import { useRef } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

export const InstallationStep = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {
    threshold: 0.75,
    freezeOnceVisible: true,
  });
  const isVisible = !!entry?.isIntersecting;

  const numberClass =
    "w-10 h-10 flex items-center justify-center text-white rounded-lg mb-4 p-2";

  const titleClass = "font-bold text-xl";
  const pClass = "text-slate-700 pb-4";

  const btnClass =
    "px-6 py-2 whitespace-nowrap inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const primaryClass = "bg-gray-800 text-white hover:bg-gray-500";

  const secondaryBtnClass =
    "bg-transparent border border-slate-200 hover:bg-slate-100";

  const separatorClass = "text-2xl text-slate-400";

  const animationClass = isVisible
    ? `animate-fade-enter-bottom opacity-0`
    : "opacity-0";

  return (
    <div className="px-4 md:px-8 max-w-6xl mx-auto">
      <section className={"py-20 md:py-40"}>
        <h2 className="font-extrabold text-3xl md:text-7xl pb-4">
          Not so hard to get there.
        </h2>

        <p className="text-xl md:text-2xl leading-relaxed pb-12">
          Embark on your Progressively journey effortlessly! Just follow these
          simple steps
          <br /> to create your first feature flag and enjoy
          <strong> 1000 free events</strong>! Success awaits!
        </p>

        <div ref={ref}>
          <ol className="flex flex-row gap-4 items-center">
            <li className={animationClass}>
              <Card>
                <div>
                  <AiOutlineUserAdd
                    className={`${numberClass} bg-indigo-500`}
                  />
                  <h3 className={titleClass}>Create an account</h3>
                  <p className={pClass}>
                    Create your account, your first project and your first
                    feature flag..
                  </p>
                  <a
                    className={`${btnClass} ${primaryClass}`}
                    href="https://dashboard.progressively.app/register"
                  >
                    Create my account
                  </a>
                </div>
              </Card>
            </li>
            <li role="separator">
              <GoChevronRight className={separatorClass} />
            </li>
            <li className={animationClass} style={{ animationDelay: "300ms" }}>
              <Card>
                <div>
                  <TbSdk className={`${numberClass} bg-orange-500`} />

                  <h3 className={titleClass}>Choose a SDK</h3>
                  <p className={pClass}>
                    Check the SDK page, choose one and add it to your codebase.
                  </p>
                  <a
                    className={`${btnClass} ${secondaryBtnClass}`}
                    href="https://docs.progressively.app/sdks/react"
                  >
                    Choose a SDK
                  </a>
                </div>
              </Card>
            </li>
            <li role="separator">
              <GoChevronRight className={separatorClass} />
            </li>
            <li className={animationClass} style={{ animationDelay: "500ms" }}>
              <Card>
                <div>
                  <FaToggleOff className={`${numberClass} bg-green-500`} />
                  <h3 className={titleClass}>Evaluate your flag</h3>
                  <p className={pClass}>
                    Make a conditional statement in your code base and play with
                    the dashboard.
                  </p>
                </div>
              </Card>
            </li>
          </ol>
        </div>
      </section>
    </div>
  );
};
