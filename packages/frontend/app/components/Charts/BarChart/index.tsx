import { useRef } from "react";
import { Typography } from "~/components/Typography";
import { styled } from "~/stitches.config";

// Bars should be contained in this box specifically
const ChartColumns = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(10rem, 1fr))",
  height: "500px",
  textAlign: "center",
  gap: "$spacing$3",

  "& .chart-column": {
    borderRight: "1px dashed $nemesisLight",
  },

  "& .chart-column:last-of-type": {
    borderRight: "none",
  },
});

const Bar = styled("div", {});

export interface BarChartProps {
  data: Array<[string, Array<{ name: string; value: number }>]>;
}

export const BarChart = ({ data }: BarChartProps) => {
  const formatterRef = useRef(new Intl.DateTimeFormat("default"));

  return (
    <div id="chart">
      <ChartColumns>
        {data.map(([date]) => (
          <div key={date} className="chart-column">
            <Typography size="uranus">{formatterRef.current.format(new Date(date))}</Typography>
          </div>
        ))}
      </ChartColumns>
    </div>
  );
};
