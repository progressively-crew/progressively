import { ResponsiveLine } from "@nivo/line";
import type { Layer } from "@nivo/line";
import {
  AxisTickSize,
  AxisTickPadding,
  LegendOffset,
  LightTextColor,
} from "./constants";
import { Tooltip } from "./Tooltip";
import { ActivePoint } from "./ActivePoint";
import { customizedTheme } from "./styles";
import { formatDate } from "./formatters";

export interface LineChartProps {
  data: any;
}

export const LineChart = ({ data }: LineChartProps) => (
  <div className="h-[400px]">
    <ResponsiveLine
      curve="basis"
      data={data}
      lineWidth={1}
      margin={{ top: 4, right: 30, bottom: LegendOffset + 16, left: 30 }}
      xScale={{
        type: "time",
        format: "%Y-%m-%d",
        precision: "day",
      }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: AxisTickSize,
        tickPadding: AxisTickPadding,
        tickValues: 10,
        format: formatDate,
      }}
      axisLeft={null}
      enableGridX={false}
      pointSize={0}
      crosshairType="x"
      enableSlices="x"
      enablePointLabel={false}
      enableArea={false}
      areaBlendMode="normal"
      areaBaselineValue={0}
      isInteractive
      areaOpacity={0}
      pointLabel=""
      colors={(p) => p.color}
      sliceTooltip={Tooltip}
      tooltip={() => null}
      enableGridY={true}
      enableCrosshair={true}
      pointColor={{ from: "color", modifiers: [] }}
      pointBorderColor={"transparent"}
      pointBorderWidth={0}
      enablePoints={false}
      useMesh={true}
      debugMesh={false}
      debugSlices={false}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: LegendOffset,
          itemsSpacing: 16,
          itemDirection: "left-to-right",
          itemWidth: 100,
          itemHeight: 20,
          symbolSize: 10,
          symbolShape: "circle",
          itemTextColor: LightTextColor,
        },
      ]}
      theme={customizedTheme()}
      layers={
        [
          "grid",
          "axes",
          "areas",
          "lines",
          "crosshair",
          "slices",
          "mesh",
          "legends",
          ActivePoint,
        ] as Array<Layer>
      }
    />
  </div>
);
