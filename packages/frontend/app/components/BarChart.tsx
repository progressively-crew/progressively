import {
  BarChart as RBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

import { useTheme } from "~/modules/theme/useTheme";
import { Spacer } from "./Spacer";

export interface BarChartProps {
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length > 0) {
    return (
      <div
        className="bg-white text-black p-4 rounded-md"
        style={{ background: payload[0].fill }}
      >
        <span className="text-xs text-gray-600 font-semibold">{label}</span>

        <Spacer size={2} />

        <div>
          {payload.map((pld: any) => (
            <div key={`${label}-${pld.value}-${pld.dataKey}`}>
              <span className="flex flex-row gap-3 items-center">
                <span className="text-gray-700">{pld.dataKey}:</span>
                <span className="font-semibold">{pld.value}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export const BarChart = ({ data }: BarChartProps) => {
  const { theme } = useTheme();

  const legendColor = theme === "dark" ? "white" : "black";

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RBarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 10,
          bottom: 40,
        }}
      >
        <XAxis
          dataKey="name"
          tick={{ fill: legendColor }}
          tickLine={{ stroke: legendColor }}
        />
        <YAxis
          tick={{ fill: legendColor }}
          tickLine={{ stroke: legendColor }}
        />
        <Tooltip content={<CustomTooltip />} cursor={false} />

        <Bar dataKey="value" unit="%">
          {data.map((entry, index) => (
            <Cell
              fill={data[index].color}
              key={entry.value}
              style={{
                filter: `drop-shadow(0px 0px 14px ${data[index].color})`,
              }}
            />
          ))}
        </Bar>
      </RBarChart>
    </ResponsiveContainer>
  );
};
