/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  PieChart as RPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { stringToColor } from "~/modules/misc/utils/stringToColor";
import { useTheme } from "~/modules/theme/useTheme";

export interface PieChartProps {
  data: Array<{ name: string; value: number }>;
}

export const PieChart = ({ data }: PieChartProps) => {
  const { theme } = useTheme();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RPieChart height={160}>
        <Pie
          data={data}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          // the props are destructured since they are not supposed to be spread to the child element.
          label={({
            index,
            endAngle,
            cornerRadius,
            paddingAngle,
            startAngle,
            maxRadius,
            outerRadius,
            innerRadius,
            tooltipPosition,
            middleRadius,
            midAngle,
            tooltipPayload,
            ...props
          }) => (
            <text
              {...props}
              dominantBaseline="central"
              fill={stringToColor(data[index].name, theme === "dark" ? 75 : 25)}
            >
              {data[index].name} ({data[index].value})
            </text>
          )}
        >
          {data.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={stringToColor(data[index].name)}
            />
          ))}
        </Pie>
      </RPieChart>
    </ResponsiveContainer>
  );
};
