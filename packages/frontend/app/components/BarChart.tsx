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

export interface BarChartProps {
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  yLabel: string;
}

export const BarChart = ({ data, yLabel }: BarChartProps) => {
  const { theme } = useTheme();

  const legendColor = theme === "dark" ? "white" : "black";

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RBarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis
          dataKey="name"
          label={{
            value: "Metrics (variants)",
            position: "insideBottomRight",
            offset: 0,
            fill: legendColor,
          }}
          tick={{ fill: legendColor }}
          tickLine={{ stroke: legendColor }}
        />
        <YAxis
          label={{
            value: yLabel,
            angle: -90,
            position: "insideBottomLeft",
            fill: legendColor,
          }}
          tick={{ fill: legendColor }}
          tickLine={{ stroke: legendColor }}
        />
        <Tooltip />

        <Bar dataKey="value" fill="#82ca9d" unit="%">
          {data.map((entry, index) => (
            <Cell fill={data[index].color} key={entry.value} />
          ))}
        </Bar>
      </RBarChart>
    </ResponsiveContainer>
  );
};
