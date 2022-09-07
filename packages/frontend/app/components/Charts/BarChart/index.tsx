import { useEffect, useRef, useState } from "react";
import { Typography } from "~/components/Typography";
import { styled } from "~/stitches.config";

// Bars should be contained in this box specifically
const ChartColumns = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(10rem, 1fr))",
  height: "500px",
  textAlign: "center",

  "& .chart-column": {
    padding: "0 $spacing$4",
    borderRight: "1px dashed $nemesisLight",
    display: "flex",
    flexDirection: "column",

    "& > div:first-of-type": {
      flex: 1,
    },

    "& > div:last-of-type": {
      flex: 0,
    },
  },

  "& .chart-label": {
    height: "$cta",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },

  "& .chart-column:last-of-type": {
    borderRight: "none",
  },
});

const Bar = styled("div", {});

export interface BarChartProps {
  data: Array<[string, Array<{ name: string; value: number }>]>;
  max: number;
}

interface FormattedDateProps {
  date: string;
  formatterRef: React.MutableRefObject<Intl.DateTimeFormat>;
}
const FormattedDate = ({ date, formatterRef }: FormattedDateProps) => {
  const [d, setD] = useState("");

  useEffect(() => {
    setD(formatterRef.current.format(new Date(date)));
  }, [date]);

  return (
    <Typography size="uranus" as="time" dateTime={date} className="chart-label">
      {d}
    </Typography>
  );
};

export const BarChart = ({ data, max }: BarChartProps) => {
  const formatterRef = useRef(new Intl.DateTimeFormat("default"));

  return (
    <div id="chart">
      <ChartColumns>
        {data.map(([date]) => (
          <div key={date} className="chart-column">
            <div></div>
            <div>
              <FormattedDate date={date} formatterRef={formatterRef} />
            </div>
          </div>
        ))}
      </ChartColumns>
    </div>
  );
};
