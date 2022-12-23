/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import {
  LineChart as RLineChart,
  ResponsiveContainer,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  Line,
  Label,
} from "recharts";
import { stringToColor } from "~/modules/misc/utils/stringToColor";
import { useTheme } from "~/modules/theme/useTheme";

export interface LineChartProps {
  data: Array<{ [key: string]: number } & { date: string }>;
}

const CustomizedAxisTick = ({ color, ...props }: any) => {
  const { x, y, payload } = props;
  const [date, setDate] = useState("");

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat();
    setDate(formatter.format(new Date(payload.value)));
  }, [payload.value]);

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="middle" fill={color}>
        {date}
      </text>
    </g>
  );
};

export const LineChart = ({ data }: LineChartProps) => {
  const { theme } = useTheme();
  const formatter = new Intl.DateTimeFormat();

  const legendColor = theme === "dark" ? "white" : "black";
  const glowEffect = (key: string) =>
    theme === "dark" ? stringToColor(key, 25) : stringToColor(key, 90);

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
          top: 20,
          right: 10,
          bottom: 40,
        }}
      >
        <XAxis
          dataKey="date"
          tick={<CustomizedAxisTick color={legendColor} />}
        />
        <YAxis tick={{ stroke: legendColor }} />
        <Tooltip />
        <Legend
          wrapperStyle={{
            paddingTop: "40px",
          }}
          formatter={(value, entry, index) => (
            <span className={stringToColor(lineKeys[index], 75)}>{value}</span>
          )}
        />

        <defs>
          <filter id="shadow" height="200%">
            <feDropShadow dx="0" dy="10" stdDeviation="10" />
          </filter>
        </defs>

        {lineKeys.map((key) => (
          <Line
            style={{
              filter: `drop-shadow(0px 0px 14px ${glowEffect(key)})`,
            }}
            key={key}
            type="monotone"
            dataKey={key}
            stroke={stringToColor(key, 75)}
            activeDot={{ r: 8 }}
            strokeWidth={4}
          />
        ))}
      </RLineChart>
    </ResponsiveContainer>
  );
};
