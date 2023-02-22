import { useMemo, useState } from "react";
import { Button } from "./Button";
import { MdRefresh } from "react-icons/md";
import type { Step } from "./Cursor";
import { Cursor } from "./Cursor";
import { Logo } from "./Logo";
import { Switch } from "./Switch/Switch";
import { SearchBar, Window } from "./Window";
import { useElementOnScreen } from "~/modules/utils/useElementOnScreen";

const OldScreen = () => {
  return (
    <div className="h-[300px] text-left p-8">
      <h2 className="font-bold text-3xl">
        Our awesome project
        <br />
        is coming soon...
      </h2>
      <p className="py-2 text-gray-700">
        Do you want to join the wishlist and be alerted when the <br />
        release happens?
      </p>
      <div className="flex flex-row gap-2 mt-2 w-2/5">
        <div className="w-full rounded h-4 bg-white border border-gray-200" />
        <div className="w-[100px] rounded h-4 bg-black" />
      </div>
    </div>
  );
};

const NewScreen = ({ hasNextFeature }: { hasNextFeature: boolean }) => {
  return (
    <div className="h-[300px] text-left p-8 flex items-center flex-col justify-center">
      <h2 className="font-bold text-3xl text-center text-slate-50">
        Progressively has finally{" "}
        <span className="text-indigo-300">landed</span>!
      </h2>

      <p className="py-2 text-slate-200">
        Brace yourself and enter this amazing new world full of capabilities
      </p>

      <div className="flex flex-row gap-2 mt-2 justify-center">
        <Button href="https://progressively.gitbook.io/docs/" size="L">
          Get Started
        </Button>

        {hasNextFeature && (
          <Button
            href="https://dashboard.progressively.app"
            variant="secondary-inverse"
            size="L"
          >
            Demo instance
          </Button>
        )}
      </div>
    </div>
  );
};

export const Hero = () => {
  const [counter, setCounter] = useState(0);
  const [isFirstActivated, setFirstActivated] = useState(false);
  const [isSecondActivated, setSecondActivated] = useState(false);

  const [containerRef, shouldPlay] = useElementOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 1.0,
  });

  const steps: Array<Step> = useMemo(() => {
    return [
      {
        name: "move",
        targetEl: "#first-switch",
        sleep: 2300,
      },
      {
        name: "action",
        callback: () => {
          setFirstActivated(true);
        },
        sleep: 1000,
      },
      {
        name: "vanish",
        sleep: 2000,
      },
    ];
  }, []);

  const reset = () => {
    setFirstActivated(false);
    setSecondActivated(false);
    setCounter((s) => s + 1);
  };

  return (
    <div className="bg-slate-900">
      <div className="max-w-screen-xl mx-auto px-4 md:px-0 pt-12 md:pt-32 w-full text-center pb-12">
        <div>
          <h1 className="text-slate-50 text-3xl font-extrabold sm:text-6xl p-1">
            Rollout quickly, effectively,
            <span className="sm:block text-indigo-300"> Progressively. </span>
          </h1>

          <p className="mt-4 sm:text-3xl sm:leading-relaxed text-slate-300 font-thin">
            A simple, accessible, lightweight, self-hosted and OpenSource{" "}
            <strong>feature flag software</strong>.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Button href="https://progressively.gitbook.io/docs/" size="L">
              Get Started
            </Button>

            <a
              href="https://railway.app/new/template/o-qwn1?referralCode=AwmVVM"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://railway.app/button.svg"
                alt="Deploy on Railway"
                className="h-12 px-4"
              />
            </a>
          </div>
        </div>

        <div className="mt-8 md:mt-20 md:-mb-40">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 drop-shadow-xl">
              <Window
                header={
                  <SearchBar>
                    <span className="flex flex-row gap-2 items-center">
                      progressively.app{" "}
                      <button
                        onClick={reset}
                        className="hover:bg-gray-200 rounded p-1"
                      >
                        <MdRefresh aria-label="Refresh example" />
                      </button>
                    </span>
                  </SearchBar>
                }
              >
                <Cursor steps={steps} key={counter} shouldPlay={shouldPlay} />
                <div className="h-[300px]">
                  <div className="border-b border-gray-200" aria-hidden>
                    <div className="flex flex-row justify-between items-center px-2">
                      <div className="flex flex-row gap-1 bg-white py-2  items-center">
                        <Logo className="h-4 w-4" />
                        <div className="text-gray-200 text-xs px-2">/</div>
                        <div className="w-12 bg-gray-200 h-2 rounded-full" />
                        <div className="text-gray-200 text-xs px-2">/</div>
                        <div className="w-8 bg-gray-200 h-2 rounded-full" />
                        <div className="text-gray-200 text-xs px-2">/</div>
                        <div className="w-14 bg-gray-200 h-2 rounded-full" />
                      </div>
                      <div className="h-4 w-4 rounded-full bg-green-100" />
                    </div>

                    <div className="flex flex-row gap-2 bg-white py-2 items-center px-2">
                      <div className="w-12 bg-gray-200 h-2 rounded-full" />
                      <div className="w-12 bg-gray-200 h-2 rounded-full" />
                    </div>
                  </div>
                  <div className="flex justify-center bg-gray-50 h-full px-2">
                    <div className="w-[400px] h-full text-left">
                      <h2 className="text-xl font-extrabold tracking-tight dark:text-white mt-6">
                        Feature flags
                      </h2>

                      <div className="flex flex-row gap-2 mt-2">
                        <div className="w-full rounded h-4 bg-white border border-gray-200" />
                        <div className="w-[100px] rounded h-4 bg-indigo-700" />
                      </div>

                      <div className="bg-white border border-gray-200 p-2 mt-4 flex flex-row justify-between items-center">
                        <div className="flex flex-row gap-2 items-center">
                          <div className="h-8 w-8 rounded bg-teal-500"></div>
                          <p className="underline text-xs">Landing page GA</p>
                        </div>
                        <div>
                          <Switch
                            id="first-switch"
                            label="Flag status"
                            checked={isFirstActivated}
                            onClick={() => {
                              setFirstActivated((s) => !s);
                            }}
                          />
                        </div>
                      </div>

                      <div className="bg-white border border-gray-200 p-2 mt-4 flex flex-row justify-between items-center">
                        <div className="flex flex-row gap-2 items-center">
                          <div className="h-8 w-8 rounded bg-yellow-300"></div>
                          <p className="underline text-xs">Show demo button</p>
                        </div>
                        <div>
                          <Switch
                            id="second-switch"
                            label="Flag status"
                            checked={isSecondActivated}
                            onClick={() => {
                              setSecondActivated((s) => !s);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Window>
            </div>
            <div className="flex-1 drop-shadow-xl">
              <Window
                inverse={isFirstActivated}
                header={
                  <SearchBar dark={isFirstActivated}>your-app.com</SearchBar>
                }
              >
                {isFirstActivated ? (
                  <div
                    className={`bg-gradient-to-r from-gray-700 via-gray-900 to-black`}
                  >
                    <NewScreen hasNextFeature={isSecondActivated} />
                  </div>
                ) : (
                  <OldScreen />
                )}
              </Window>
            </div>
          </div>
        </div>
      </div>

      <div id="ob-kick" ref={containerRef} className="mt-40 -mb-28" />
    </div>
  );
};
