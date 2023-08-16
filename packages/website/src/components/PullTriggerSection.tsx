import { useState } from "react";
import { Switch } from "./Switch/Switch";
import { Browser } from "./Browser";
import { Logo } from "./Logo";
import { Code } from "./Code";
import { BsCodeSlash } from "react-icons/bs";
import { TbWorld } from "react-icons/tb";

export const PullTriggerSection = ({
  clientComponent,
}: {
  clientComponent: string;
}) => {
  const [abChecked, setAbChecked] = useState(false);
  const [newCtaCheck, setNewCtaCheck] = useState(false);
  const [newPricingSection, setNewPricingSection] = useState(false);
  const [newDashboard, setNewDashboard] = useState(false);

  const sharedLineClass = `bg-slate-200 rounded-full h-4`;

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="">
        <h2 className="text-2xl pb-4 pt-2">
          <Logo />
        </h2>
        <div className="rounded-lg p-12 bg-white border border-gray-200 shadow-sm">
          <div className="pb-2 border-b border-slate-100">
            <Switch
              checked={newDashboard}
              onClick={() => setNewDashboard((s) => !s)}
              label="New showcase (alpha)"
            />

            <p className="text-xs text-slate-700">
              {newDashboard ? "Only for Canary users" : "Not activated"}
            </p>
          </div>

          <div className="border-b border-slate-100 py-2">
            <Switch
              checked={abChecked}
              onClick={() => setAbChecked((s) => !s)}
              label="A/B test layout"
            />
            <p className="text-xs text-slate-700">
              {abChecked ? "Visible for 50% of the audience" : "Not activated"}
            </p>
          </div>
          <div className="border-b border-slate-100 py-2">
            <Switch
              checked={newCtaCheck}
              onClick={() => setNewCtaCheck((s) => !s)}
              label="CTA for conversion"
            />

            <p className="text-xs text-slate-700">
              {newCtaCheck ? "Activated" : "Not activated"}
            </p>
          </div>

          <div className="pt-2">
            <Switch
              checked={newPricingSection}
              onClick={() => setNewPricingSection((s) => !s)}
              label="Promotion banner"
            />

            <p className="text-xs text-slate-700">
              {newPricingSection ? "Activated" : "Not activated"}
            </p>
          </div>
        </div>
      </div>

      <div className="">
        <h2 className="font-bold text-2xl pb-4 flex flex-row gap-2 items-center">
          <TbWorld /> Your website
        </h2>
        <div className="border border-slate-200 rounded-xl overflow-hidden">
          <Browser>
            {newPricingSection && (
              <div
                className={`${sharedLineClass} motion-safe:animate-fade-enter-top !rounded-none !bg-[#44BCFF] !h-8 absolute z-10 w-full flex flex-row items-center justify-center gap-2`}
              >
                <p className="text-xs text-white">Get 20% for free!</p>

                <button
                  className={`${sharedLineClass} bg-slate-50 transition-all hover:outline hover:outline-2 outline-blue-500 active:bg-slate-200`}
                  style={{ width: "10%" }}
                  aria-label="Convert!"
                />
              </div>
            )}
            <div className="p-4">
              <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-2">
                  <div
                    className={`${sharedLineClass} transition-all`}
                    style={{ width: 40 }}
                  />
                  <div className={sharedLineClass} style={{ width: 60 }} />
                  {newDashboard && (
                    <div
                      className={`${sharedLineClass} motion-safe:animate-fade-enter-right !bg-[#FF44EC]`}
                      style={{ width: 60 }}
                    />
                  )}
                </div>
                <div className="flex flex-row gap-2">
                  <div className={sharedLineClass} style={{ width: 30 }} />
                  <div className={sharedLineClass} style={{ width: 30 }} />
                </div>
              </div>

              <div className="flex flex-col gap-2 max-w-lg mx-auto pt-4">
                <div
                  className={`flex ${
                    abChecked ? "flex-row items-center" : "flex-col"
                  } items-center gap-2 transition-all`}
                >
                  <div
                    className={`${sharedLineClass} !rounded-lg ${
                      abChecked ? "w-1/2 !h-20" : "w-20 !h-12"
                    }`}
                  />
                  <div
                    className={`flex flex-col ${
                      abChecked ? "" : "items-center"
                    } gap-2 transition-all w-full`}
                  >
                    <div
                      className={sharedLineClass}
                      style={{ width: abChecked ? "100%" : "50%" }}
                    />
                    <div className={sharedLineClass} style={{ width: "60%" }} />
                    <div
                      className={`flex flex-row gap-2 w-full ${
                        abChecked ? "" : "justify-center"
                      }`}
                    >
                      <div
                        className={`${sharedLineClass}`}
                        style={{ width: abChecked ? "20%" : "10%" }}
                      />
                      {newCtaCheck && (
                        <button
                          className={`${sharedLineClass} motion-safe:animate-fade-enter-bottom !bg-[#FF675E] transition-all hover:outline hover:outline-2 outline-blue-500 active:bg-slate-800`}
                          style={{ width: abChecked ? "20%" : "10%" }}
                          aria-label="Convert!"
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="pt-8 flex flex-col gap-2">
                  <div className={sharedLineClass} style={{ width: "80%" }} />
                  <div className={sharedLineClass} style={{ width: "40%" }} />
                </div>
              </div>
            </div>
          </Browser>
        </div>
      </div>

      <div className="">
        <h2 className="font-bold text-2xl pb-4 flex flex-row gap-2 items-center">
          <BsCodeSlash className="h-6" /> Your code
        </h2>
        <Code html={clientComponent}></Code>
      </div>
    </div>
  );
};
