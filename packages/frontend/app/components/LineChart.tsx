import {
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Area,
  AreaChart,
  Tooltip,
} from "recharts";

interface DataKey {
  name: string;
  color: string;
  dashed?: boolean;
}

export interface LineChartProps {
  dataKeys: Array<DataKey>;
  items: Array<unknown>;
}

export const LineChart = ({ dataKeys, items }: LineChartProps) => {
  const formatX = (item: string) => {
    return new Intl.DateTimeFormat().format(new Date(item));
  };

  return (
    <ResponsiveContainer width="100%" aspect={16.0 / 9.0}>
      <AreaChart
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
              <stop offset="95%" stopColor={dataKey.color} stopOpacity={0.4} />
            </linearGradient>
          ))}
        </defs>
        <XAxis dataKey="date" tickFormatter={formatX} />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <Tooltip />

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
  );
};
