/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  Line,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";
import { stringToColor } from "~/modules/misc/utils/stringToColor";
import { useTheme } from "~/modules/theme/useTheme";
import { Spacer } from "./Spacer";

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
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="middle"
        fill={color}
        fontWeight={400}
        fontSize={"0.8em"}
      >
        {date}
      </text>
    </g>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  const formatter = new Intl.DateTimeFormat();

  if (active && payload && payload.length > 0) {
    return (
      <div className="bg-white text-black p-4 rounded-md">
        <span className="text-xs text-gray-600 font-semibold">
          {label ? formatter.format(new Date(label)) : ""}
        </span>

        <Spacer size={2} />

        <div>
          {payload.map((pld: any) => (
            <div key={`${label}-${pld.value}-${pld.dataKey}`}>
              <span className="flex flex-row gap-3 items-center">
                <span
                  aria-hidden
                  style={{ background: stringToColor(pld.dataKey, 75) }}
                  className="h-4 w-4 block rounded"
                />
                <span className="text-gray-700">{pld.dataKey}:</span>
                <span
                  style={{ color: stringToColor(pld.dataKey, 75) }}
                  className="font-semibold"
                >
                  {pld.value}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export const LineChart = ({ data }: LineChartProps) => {
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
      <AreaChart
        width={500}
        height={300}
        data={data}
        style={{ marginTop: "-5px" }}
      >
        <CartesianGrid vertical={false} stroke={themeValues.stroke} />

        <Legend
          wrapperStyle={{
            paddingTop: 10,
            paddingBottom: 10,
            background: themeValues.legendBg,
            borderBottom: themeValues.legendBorder,
            fontWeight: "500",
          }}
          verticalAlign="top"
          formatter={(value, entry, index) => (
            <span className={stringToColor(lineKeys[index], 75)}>{value}</span>
          )}
        />

        <XAxis
          dataKey="date"
          axisLine={false}
          tick={<CustomizedAxisTick color={themeValues.legendFg} />}
        />

        <Tooltip content={<CustomTooltip />} />

        {lineKeys.map((key) => (
          <Area
            key={key}
            type="monotone"
            dataKey={key}
            stroke={themeValues.areaStroke(key)}
            fill={themeValues.areaFill(key)}
            activeDot={{ r: 8 }}
            strokeWidth={2}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
};
