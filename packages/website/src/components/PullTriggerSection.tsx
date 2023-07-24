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
  const [percentage, setPercentage] = useState(100);

  return (
    <div className="bg-white p-4 rounded-lg">
      <div className="flex flex-col md:flex-row justify-between md:items-center pb-2">
        <Switch
          checked={checked}
          onClick={() => setChecked((s) => !s)}
          label="Switch display"
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

      <div className="grid md:grid-cols-3 gap-4 pb-4">
        <BrowserVersion isToggled={checked && percentage >= 33} />
        <BrowserVersion isToggled={checked && percentage >= 66} />
        <BrowserVersion isToggled={checked && percentage >= 100} />
      </div>

      <Code html={clientComponent} />
    </div>
  );
};
