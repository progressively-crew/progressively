import { useState } from "react";
import { Card } from "./Card";
import { FaChartLine } from "react-icons/fa";
import { NumberInput } from "./NumberInput";
import { Switch } from "./Switch/Switch";
import { BrowserVersion } from "./Browser";

const iconClass = "w-10 h-10 rounded p-2 text-white bg-purple-500";

const Histogram = ({ percentage }: { percentage: number }) => {
  const barClass = "rounded-t w-4 md:w-8 transition-all";
  const dateClass = "text-xs";

  const bars = [
    { title: "6d.ago", height: "8%", isToday: false },
    { title: "5d.ago", height: "5%", isToday: false },
    { title: "4d.ago", height: "3%", isToday: false },
    { title: "3d.ago", height: "10%", isToday: false },
    { title: "2d.ago", height: "7%", isToday: false },
    { title: "1d.ago", height: "8%", isToday: false },
  ];

  const todayHeight = `${percentage / 2}%`;

  bars.push({
    title: "Today",
    height: todayHeight,
    isToday: true,
  });

  return (
    <div className="flex flex-row gap-2 md:gap-4 h-[180px]">
      {bars.map((bar) => (
        <div key={bar.title} className="h-full flex flex-col justify-end">
          <div
            className={`${barClass} ${
              bar.isToday ? "bg-red-400" : "bg-slate-200"
            }`}
            style={{ height: bar.height }}
          />
          <div className={dateClass}>{bar.title}</div>
        </div>
      ))}
    </div>
  );
};

export const CorrelatePercentageError = () => {
  const [percentage, setPercentage] = useState(35);
  const [checked, setChecked] = useState(false);

  const errorLevelPercentage = checked ? percentage : 10;

  return (
    <div>
      <div className="max-w-screen-lg mx-auto w-full">
        <p className="text-lg leading-relaxed pb-8 text-slate-500">
          Supercharge your feature management with seamless error correlation in
          your tracking tool. Effortlessly link error occurrences to specific
          feature rollouts, allowing you to swiftly identify any feature that
          triggers excessive errors. With just one click, you gain the power to
          deactivate problematic features instantly, ensuring a smooth and
          error-free user experience!
        </p>
      </div>

      <div className="md:grid md:grid-cols-[3fr_2fr] gap-4 hidden">
        <Card>
          <div className="flex flex-col md:flex-row justify-between md:items-center pb-2">
            <Switch
              checked={checked}
              onClick={() => setChecked((s) => !s)}
              label="Toggle feature"
            />

            <NumberInput
              value={percentage}
              onChange={(n) => {
                setPercentage(n);
              }}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4 pb-4">
            <BrowserVersion isToggled={checked && percentage >= 33} />
            <BrowserVersion isToggled={checked && percentage >= 66} />
            <BrowserVersion isToggled={checked && percentage >= 100} />
          </div>
        </Card>

        <Card>
          <div className="flex flex-row gap-4 items-center">
            <FaChartLine className={iconClass} />

            <p className="font-bold">Your error and exception tracking tool</p>
          </div>

          <Histogram percentage={errorLevelPercentage} />
        </Card>
      </div>
    </div>
  );
};
