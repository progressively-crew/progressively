import {
  BarChart as RBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

export interface BarChartProps {
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  yLabel: string;
}

export const BarChart = ({ data, yLabel }: BarChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RBarChart
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
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          label={{
            value: "Metrics (variants)",
            position: "insideBottomRight",
            offset: 0,
          }}
        />
        <YAxis
          label={{ value: yLabel, angle: -90, position: "insideBottomLeft" }}
        />
        <Tooltip />

        <Bar dataKey="value" fill="#82ca9d" unit="%">
          {data.map((entry, index) => (
            <Cell fill={data[index].color} key={entry.value} />
          ))}
        </Bar>
      </RBarChart>
    </ResponsiveContainer>
  );
};
