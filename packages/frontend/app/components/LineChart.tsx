/* eslint-disable @typescript-eslint/no-unused-vars */
import { Fragment } from "react";
import {
  LineChart as RLineChart,
  ResponsiveContainer,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  Line,
} from "recharts";
import { stringToColor } from "~/modules/misc/utils/stringToColor";
import { useTheme } from "~/modules/theme/useTheme";

export interface LineChartProps {
  data: Array<{ [key: string]: number } & { date: string }>;
}

const CustomLine = ({ progressivelyDataKey, ...props }: any) => {
  return (
    <Line
      type="monotone"
      dataKey={progressivelyDataKey}
      stroke="red"
      activeDot={{ r: 8 }}
      {...props}
    />
  );
};

export const LineChart = ({ data }: LineChartProps) => {
  const { theme } = useTheme();

  const keysDict: { [key: string]: boolean } = {};
  for (const d of data) {
    for (const k of Object.keys(d)) {
      if (k !== "date") {
        keysDict[k] = true;
      }
    }
  }
  const lineKeys = Object.keys(keysDict);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RLineChart
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
        <XAxis dataKey="date" allowDuplicatedCategory={false} />
        <YAxis />
        <Tooltip />
        <Legend />

        {lineKeys.map((key) => (
          <Line
            key={key}
            type="monotone"
            dataKey={key}
            stroke="red"
            activeDot={{ r: 8 }}
          />
        ))}
      </RLineChart>
    </ResponsiveContainer>
  );
};
