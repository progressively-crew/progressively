import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { NumberValue } from "./NumberValue";
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
  const max = data.reduce(
    (actualMax, curr) => (curr.value > actualMax ? curr.value : actualMax),
    0
  );

  return (
    <div className="relative flex flex-row">
      {data.map((d, index: number) => (
        <div key={d.name} className="flex flex-row items-center">
          <div className="shrink-0 w-[70px]">
            <div className="h-[100px] relative">
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <Typography className="font-bold dark:text-slate-900">
                  <NumberValue value={d.value} />
                </Typography>
              </div>
              <div className="w-full h-full bg-slate-100 dark:bg-slate-700" />
              <div
                className="w-full absolute bottom-0 flex items-center justify-center"
                style={{
                  height: `${(d.value / max) * 100}%`,
                  background: stringToColor(d.name, 95),
                  borderLeft: `4px solid ${stringToColor(d.name, 75)}`,
                  borderRight: `4px solid ${stringToColor(d.name, 75)}`,
                  borderTop: `4px solid ${stringToColor(d.name, 75)}`,
                }}
              ></div>
            </div>

            <Tooltip tooltip={d.name}>
              <Typography className="text-xs truncate" as="p" tabIndex={0}>
                {d.name}
              </Typography>
            </Tooltip>
          </div>
          {index !== data.length - 1 && (
            <div className="px-2">
              <MdKeyboardDoubleArrowRight className="text-3xl text-slate-200" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
