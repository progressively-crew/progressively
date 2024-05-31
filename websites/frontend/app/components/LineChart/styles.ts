import { LineSvgProps } from "@nivo/line";
import {
  LightTextColor,
  LightDashedGridColor,
  DashedGridSize,
  LegendFontSize,
} from "./constants";

export const customizedTheme = (): LineSvgProps["theme"] => ({
  axis: {
    ticks: {
      text: {
        fill: LightTextColor,
      },
    },
  },
  crosshair: {
    line: {
      stroke: LightDashedGridColor,
      strokeWidth: 1,
      strokeDasharray: DashedGridSize,
    },
  },
  grid: {
    line: {
      stroke: LightDashedGridColor,
      strokeWidth: 1,
      strokeDasharray: DashedGridSize,
    },
  },
  legends: {
    text: {
      fontSize: LegendFontSize,
    },
  },
});
