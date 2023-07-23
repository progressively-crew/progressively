import { useState } from "react";
import { Switch } from "./Switch/Switch";
import { Browser } from "./Browser";
import { EasyToUse } from "./EasyToUse";
import { NumberInput } from "./NumberInput";

export const PullTriggerSection = ({
  clientComponent,
}: {
  clientComponent: string;
}) => {
  const [checked, setChecked] = useState(false);
  const [percentage, setPercentage] = useState(100);

  const browserContent = (target: number) => {
    const isSwitched = checked && percentage >= target;

    const wrapperClass = isSwitched
      ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
      : "bg-slate-50";

    const itemClass = isSwitched ? "bg-white" : "bg-gray-300";

    return (
      <div
        className={`flex flex-col gap-1 h-full transition-all ${wrapperClass} p-4`}
      >
        <div
          className={`font-extrabold rounded-full w-full h-3 ${itemClass}`}
        ></div>
        <div
          className={`font-extrabold rounded-full w-[66%] h-3 ${itemClass}`}
        ></div>
        <div
          className={`font-extrabold rounded-full w-[33%] h-3 ${itemClass}`}
        ></div>
      </div>
    );
  };

  return (
    <div className="bg-white p-4 rounded-lg">
      <div className="flex flex-col md:flex-row justify-between md:items-center pb-2">
        <Switch
          checked={checked}
          onClick={() => setChecked((s) => !s)}
          label="Switch color"
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
        <Browser>{browserContent(33)}</Browser>
        <Browser>{browserContent(66)}</Browser>
        <Browser>{browserContent(100)}</Browser>
      </div>

      <EasyToUse clientComponent={clientComponent} />
    </div>
  );
};
