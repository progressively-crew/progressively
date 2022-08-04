import {
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Line,
  LineChart as RawLineChart,
  Tooltip,
  Legend,
} from "recharts";

import { TableChart } from "./TableChart";
import { formatDate } from "./utils";

interface DataKey {
  name: string;
  color: string;
  dashed?: boolean;
  label?: string;
}

export type ChartVariant = "chart" | "table";
export interface LineChartProps {
  dataKeys: Array<DataKey>;
  items: Array<{ date: string } & { [key: string]: number | string }>;
  variant: ChartVariant;
  labelledBy: string;
}

export const LineChart = ({
  dataKeys,
  items,
  variant,
  labelledBy,
}: LineChartProps) => {
  if (variant === "table") {
    return (
      <TableChart
        items={items}
        dateFormatter={formatDate}
        labelledBy={labelledBy}
        headers={dataKeys.map(({ label, name }) => ({ key: name, label }))}
      />
    );
  }

  const contentStyle = {
    border: "none",
  };

  return (
    <div>
      <ResponsiveContainer width="100%" aspect={16.0 / 9.0}>
        <RawLineChart
          aria-labelledby={labelledBy}
          data={items}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <XAxis dataKey="date" tickFormatter={formatDate} />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <Tooltip labelFormatter={formatDate} contentStyle={contentStyle} />
          <Legend verticalAlign="top" height={36} />

          {dataKeys.map((dataKey, index: number) => (
            <Line
              name={dataKey.label}
              key={`chart-item-${dataKey.name}-${index}`}
              dataKey={dataKey.name}
              type="monotone"
              stroke={dataKey.color}
              strokeDasharray={dataKey.dashed ? "3 3" : undefined}
              strokeWidth={3}
            />
          ))}
        </RawLineChart>
      </ResponsiveContainer>
    </div>
  );
};
