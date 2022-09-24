import { useEffect, useRef, useState } from "react";
import { Typography } from "~/components/Typography";
import { styled } from "~/stitches.config";

function generateColor(stringInput: string) {
  const stringUniqueHash = [...stringInput].reduce((acc, char) => {
    return char.codePointAt(0) + ((acc << 5) - acc);
  }, 0);

  return `hsl(${stringUniqueHash % 360}, 95%, 35%)`;
}

// Bars should be contained in this box specifically
const ChartColumns = styled("div", {
  width: "100%",
  display: "grid",
  overflowX: "scroll",
  gridAutoFlow: "column",
  gridTemplateColumns: "repeat(auto-fill, minmax(10rem, 1fr))",
  height: "500px",
  textAlign: "center",

  "& .chart-column": {
    padding: "0 $spacing$4",
    paddingTop: "$spacing$10",
    borderRight: "1px dashed $nemesisLight",
    display: "flex",
    flexDirection: "column",
    width: "130px",

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
    marginTop: "$spacing$6",
  },

  "& .chart-column:last-of-type": {
    borderRight: "none",
  },

  "& .chart-count-wrapper": {
    display: "flex",
    gap: "$spacing$1",
  },

  "& .chart-value-title": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    height: "$ctaSmall",
    marginTop: "-$sizes$ctaSmall",
    width: "100%",
  },
});

const RawBar = styled("div", {
  height: "100%",
});

const BarWrapper = styled("div", {
  marginTop: "auto",
  width: "100%",
});

interface BarProps {
  name: string;
  size: string;
  value: number;
}

const Bar = ({ size, name, value }: BarProps) => {
  return (
    <BarWrapper style={{ height: size, position: "relative" }}>
      <Typography
        as="span"
        size="neptune"
        lineHeight="title"
        className="chart-value-title"
      >
        {value}
      </Typography>
      <RawBar style={{ background: generateColor(name) }} />

      <Typography size="neptune">{name}</Typography>
    </BarWrapper>
  );
};

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
    <div>
      <ChartColumns>
        {data.map(([date, variantsHits]) => (
          <div key={date} className="chart-column">
            <div className="chart-count-wrapper">
              {variantsHits.map((vh) => (
                <Bar
                  name={vh.name}
                  size={`${(vh.value / max) * 100}%`}
                  key={`${vh.value}-${vh.name}-${date}`}
                  value={vh.value}
                />
              ))}
            </div>

            <div>
              <FormattedDate date={date} formatterRef={formatterRef} />
            </div>
          </div>
        ))}
      </ChartColumns>
    </div>
  );
};
