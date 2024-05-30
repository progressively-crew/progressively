/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  Legend,
  Tooltip,
  XAxis,
  CartesianGrid,
  LineChart as RLineChart,
  Line,
} from "recharts";
import { stringToColor } from "~/modules/misc/utils/stringToColor";
import { Spacer } from "./Spacer";

export interface LineChartProps {
  data: Array<{ count: number; date: string }>;
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
        fontSize={"0.6em"}
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
  const themeValues = {
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
    <ResponsiveContainer width="100%" aspect={16 / 9} className="pb-2">
      <RLineChart
        width={500}
        height={300}
        data={data}
        margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
      >
        <CartesianGrid vertical={false} stroke={themeValues.stroke} />

        {/* <Legend
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
        /> */}

        <XAxis
          dataKey="date"
          axisLine={false}
          tick={<CustomizedAxisTick color={themeValues.legendFg} />}
          tickLine={false}
        />

        <Tooltip content={<CustomTooltip />} />

        {lineKeys.map((key) => (
          <Line
            key={key}
            type="monotone"
            dataKey={key}
            stroke={themeValues.areaStroke(key)}
            fill={themeValues.areaFill(key)}
            activeDot={{ r: 8 }}
            strokeWidth={4}
          />
        ))}
      </RLineChart>
    </ResponsiveContainer>
  );
};
