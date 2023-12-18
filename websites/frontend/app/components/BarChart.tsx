import { Tooltip } from "./Tooltip/Tooltip";
import { Typography } from "./Typography";
import { stringToColor } from "~/modules/misc/utils/stringToColor";

export interface Datum {
  name: string;
  value: number;
}

export interface BarChartProps {
  data: Array<Datum>;
}

export const BarChart = ({ data }: BarChartProps) => {
  // eslint-disable-next-line unicorn/no-array-reduce
  const max = data.reduce(
    (actualMax, curr) => (curr.value > actualMax ? curr.value : actualMax),
    0
  );

  return (
    <div className="relative flex flex-row gap-2">
      {data.map((d) => (
        <div key={d.name} className="shrink-0 w-[70px]">
          <div className="h-[100px] relative">
            <div className="w-full h-full bg-slate-100 dark:bg-slate-700" />
            <div
              className="w-full absolute bottom-0"
              style={{
                height: `${(d.value / max) * 100}%`,
                background: stringToColor(d.name, 95),
                border: `1px solid ${stringToColor(d.name, 75)}`,
              }}
            ></div>
          </div>

          <Tooltip tooltip={d.name}>
            <Typography className="text-xs truncate" as="p" tabIndex={0}>
              {d.name}
            </Typography>
          </Tooltip>
        </div>
      ))}
    </div>
  );
};
