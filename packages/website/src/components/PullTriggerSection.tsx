import { useState } from "react";
import { Switch } from "./Switch/Switch";
import { Browser } from "./Browser";
import hexagon from "../images/Hexagon.svg";

export const PullTriggerSection = () => {
  const [checked, setChecked] = useState(false);
  const [percentage, setPercentage] = useState(100);

  const browserContent = (target: number) => {
    const className = checked && percentage >= target ? "font-mono" : "";

    return (
      <div
        className={`text-center flex flex-col items-center justify-center gap-4 h-full ${className}`}
      >
        <h1 className="text-3xl font-extrabold text-slate-900">
          Introducing <span>Progressively</span>
        </h1>

        <hr />

        <p className="text-lg sm:text-center text-slate-700">
          A simple, accessible, lightweight and OpenSource feature flag
          software.
        </p>
      </div>
    );
  };

  return (
    <div
      className="bg-white"
      style={{
        backgroundImage: `url("${hexagon}")`,
      }}
    >
      <div className="px-4 md:px-8 max-w-6xl mx-auto">
        <section className={"py-20 md:py-40"}>
          <h2 className="font-extrabold text-4xl md:text-7xl pb-4 md:text-center">
            <span>Pull a trigger, deploy a feature</span>{" "}
          </h2>
          <p className="text-2xl leading-relaxed md:text-center">
            Instantly rollout your new feature to your audience, just by
            switching a toggle.
          </p>

          <div className="flex flex-col md:flex-row justify-between md:items-center pt-12">
            <Switch
              checked={checked}
              onClick={() => setChecked((s) => !s)}
              label="Switch to font mono"
            />

            <div className="flex flex-row items-center gap-2 md:justify-center">
              <label htmlFor="percentage" className="font-extrabold">
                Percentage of the audience
              </label>
              <div className="flex flex-row">
                <input
                  type="number"
                  id="percentage"
                  min={0}
                  max={100}
                  className="bg-gray-100 h-10 rounded-l p-2"
                  value={percentage}
                  onChange={(e) => {
                    setPercentage(Number(e.target.value));
                  }}
                />
                <span className="p-2 h-10 rounded-r bg-gray-200 font-mono w-10 font-extrabold text-center text-xl">
                  %
                </span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 pt-4">
            <Browser>{browserContent(50)}</Browser>
            <Browser>{browserContent(100)}</Browser>
          </div>
        </section>
      </div>
    </div>
  );
};
