import { useState } from "react";
import { Switch } from "./Switch/Switch";
import { TwitterFeed } from "./TwitterFeed";

export const PullTriggerSection = () => {
  const [checked, setChecked] = useState(false);

  return (
    <div className="bg-white">
      <div className="px-4 md:px-8 max-w-6xl mx-auto">
        <section className={"py-20 md:py-40"}>
          <h2 className="font-extrabold text-4xl md:text-5xl pb-4 md:text-center flex flex-col md:flex-row gap-4 md:justify-center md:items-center">
            <span>Pull a trigger, deploy a feature</span>{" "}
            <Switch
              checked={checked}
              onClick={() => setChecked((s) => !s)}
              label="Toggle twitter feed"
            />
          </h2>
          <p className="text-2xl leading-relaxed md:text-center">
            Instantly rollout your new feature to your audience, just by
            switching a toggle.
          </p>

          {checked && <TwitterFeed />}
        </section>
      </div>
    </div>
  );
};
