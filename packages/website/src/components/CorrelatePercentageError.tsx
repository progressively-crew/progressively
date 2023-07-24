import { useState } from "react";
import { Card } from "./Card";
import { FaChartLine } from "react-icons/fa";
import { NumberInput } from "./NumberInput";
import { Switch } from "./Switch/Switch";
import { BrowserVersion } from "./Browser";

const iconClass = "w-10 h-10 rounded p-2 text-white bg-purple-500";

const Histogram = ({ percentage }: { percentage: number }) => {
  const barClass = "rounded-t w-4 md:w-8";
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
  const [percentage, setPercentage] = useState(10);
  const [checked, setChecked] = useState(false);
  return (
    <div>
      <div className="px-4 md:px-8 max-w-6xl mx-auto">
        <section className={"py-12 md:py-32"}>
          <h2 className="font-extrabold text-4xl md:text-7xl pb-4">
            Correlate feature rollout
            <br /> and error rising
          </h2>

          <p className="text-2xl leading-relaxed pb-4">
            Correlate errors raised in your tracking tool with your feature
            rollout. When a feature generates too many errors,{" "}
            <strong>you can deactivate it in one click</strong>.
          </p>

          <div className="grid md:grid-cols-[3fr_2fr] gap-4">
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
            </Card>

            <Card>
              <div className="flex flex-row gap-4 items-center">
                <FaChartLine className={iconClass} />

                <p className="font-bold">
                  Your error and exception tracking tool
                </p>
              </div>

              <Histogram percentage={percentage} />
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};
