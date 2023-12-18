import {
  ResponsiveContainer,
  BarChart as RawBarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Rectangle,
} from "recharts";
import { stringToColor } from "~/modules/misc/utils/stringToColor";
import { useTheme } from "~/modules/theme/useTheme";

export interface BarChartProps {
  data: Array<{ eventName: string; count: number }>;
}

export const BarChart = ({ data }: BarChartProps) => {
  const { theme } = useTheme();

  const themeValues =
    theme === "dark"
      ? {
          legendFg: "#e2e8f0",
          legendBg: "#0f172a",
          stroke: "#334155",
          legendBorder: "1px solid #1e293b",
          areaStroke: (k: string) => stringToColor(k, 75),
          areaFill: (k: string) => stringToColor(k, 95),
        }
      : {
          legendFg: "#64748b",
          legendBg: "#f8fafc",
          stroke: "#f1f5f9",
          legendBorder: "1px solid #e5e7eb",
          areaStroke: (k: string) => stringToColor(k, 75),
          areaFill: (k: string) => stringToColor(k, 95),
        };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RawBarChart width={500} height={300} data={data}>
        <CartesianGrid vertical={false} stroke={themeValues.stroke} />
        <XAxis dataKey="eventName" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="count"
          fill="#8884d8"
          activeBar={<Rectangle fill="pink" stroke="blue" />}
        />
      </RawBarChart>
    </ResponsiveContainer>
  );
};
