import {
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Area,
  AreaChart,
  Tooltip,
} from "recharts";
import { styled, theme } from "~/stitches.config";
import { TableChart } from "./TableChart";

const ChartWrapper = styled("div", {
  marginLeft: "-$spacing$8",

  "& p": {
    fontSize: "$content",
    fontWeight: "$bold",
  },
});

interface DataKey {
  name: string;
  color: string;
  dashed?: boolean;
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
  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat().format(new Date(date));
  };

  if (variant === "table") {
    return (
      <TableChart
        items={items}
        dateFormatter={formatDate}
        labelledBy={labelledBy}
      />
    );
  }

  const contentStyle = {
    background: theme.colors.background.toString(),
    border: "none",
    borderRadius: theme.borderRadius.regular.toString(),
    padding: theme.spacing[4].toString(),
  };

  return (
    <ChartWrapper>
      <ResponsiveContainer width="100%" aspect={16.0 / 9.0}>
        <AreaChart
          aria-labelledby={labelledBy}
          data={items}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            {dataKeys.map((dataKey) => (
              <linearGradient
                key={`${dataKey.name}-${dataKey.color}`}
                id={dataKey.name}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="95%"
                  stopColor={dataKey.color}
                  stopOpacity={0.4}
                />
              </linearGradient>
            ))}
          </defs>
          <XAxis dataKey="date" tickFormatter={formatDate} />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <Tooltip
            labelFormatter={formatDate}
            contentStyle={contentStyle}
            labelStyle={{ marginBottom: theme.spacing[2].toString() }}
          />

          {dataKeys.map((dataKey, index: number) => (
            <Area
              key={`chart-item-${dataKey.name}-${index}`}
              type="linear"
              dataKey={dataKey.name}
              fillOpacity={1}
              fill={`url(#${dataKey.name})`}
              stroke={dataKey.color}
              strokeDasharray={dataKey.dashed ? "3 3" : undefined}
              strokeWidth={3}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};
