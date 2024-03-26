/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  Legend,
  Tooltip,
  XAxis,
  CartesianGrid,
  Bar,
  BarChart,
  Rectangle,
} from "recharts";
import { stringToColor } from "~/modules/misc/utils/stringToColor";
import { Spacer } from "./Spacer";

export interface BarChartProps {
  data: Array<{ count: number; date: string }>;
}

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

export const BarChart2 = ({ data }: BarChartProps) => {
  const themeValues = {
    stroke: "#f1f5f9",
    legendBg: "#f8fafc",
    legendBorder: "1px solid #e5e7eb",
    areaStroke: (k: string) => stringToColor(k, 75),
    areaFill: (k: string) => stringToColor(k, 95),
    areaStrokeHighlight: (k: string) => stringToColor(k, 25),
    areaFillHighlight: (k: string) => stringToColor(k, 75),
  };

  const keysDict: { [key: string]: boolean } = {};
  for (const d of data) {
    for (const k of Object.keys(d)) {
      if (k !== "date") {
        keysDict[k] = true;
      }
    }
  }
  const barKeys = Object.keys(keysDict);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
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
            <span style={{ color: stringToColor(barKeys[index], 75) }}>
              {value}
            </span>
          )}
        />

        <XAxis dataKey="date" />

        <Tooltip content={<CustomTooltip />} />

        {barKeys.map((key) => (
          <Bar
            key={key}
            type="monotone"
            dataKey={key}
            stroke={themeValues.areaStroke(key)}
            fill={themeValues.areaFill(key)}
            strokeWidth={2}
            activeBar={
              <Rectangle
                fill={themeValues.areaFillHighlight(key)}
                stroke={themeValues.areaStrokeHighlight(key)}
              />
            }
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};
