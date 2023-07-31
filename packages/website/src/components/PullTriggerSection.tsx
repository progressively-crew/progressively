import { useState } from "react";
import { Switch } from "./Switch/Switch";
import { BrowserVersion } from "./Browser";
import { Code } from "./Code";
import { NumberInput } from "./NumberInput";

export const PullTriggerSection = ({
  clientComponent,
}: {
  clientComponent: string;
}) => {
  const [checked, setChecked] = useState(false);
  const [percentage, setPercentage] = useState(50);

  return (
    <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
      <div className="rounded-lg p-12 bg-white">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between pb-4 gap-2">
          <Switch
            checked={checked}
            onClick={() => setChecked((s) => !s)}
            label="Toggle feature"
          />

          <NumberInput
            value={percentage}
            onChange={(n) => {
              if (checked) {
                setPercentage(n);
              }
            }}
          />
        </div>

        <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-4">
          <BrowserVersion isToggled={checked && percentage >= 25} />
          <BrowserVersion isToggled={checked && percentage >= 50} />
          <BrowserVersion isToggled={checked && percentage >= 75} />
          <div className="hidden xl:block">
            <BrowserVersion isToggled={checked && percentage >= 100} />
          </div>
        </div>
      </div>

      <Code html={clientComponent} />
    </div>
  );
};
