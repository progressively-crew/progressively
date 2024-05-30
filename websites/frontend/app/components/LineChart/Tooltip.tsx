import type { Point, SliceTooltipProps } from "@nivo/line";
import type { ReactNode } from "react";

type LineChartPoint = { data: Point["data"] & { Icon?: ReactNode } } & Point;

export const Tooltip = ({ slice }: SliceTooltipProps) => {
  const xFormatted = slice.points[0].data.x.toString();

  return (
    <div className="bg-tooltip rounded-sm shadow-md p-200 border border-component-quaternary min-w-[200px]">
      <p className="body-component-sm-bold text-secondary text-sm">
        {xFormatted}
      </p>
      <ul className="pt-150 flex flex-col gap-100">
        {slice.points.map((point: LineChartPoint) => (
          <li
            key={point.id}
            className="text-sm text-primary flex flex-row items-center justify-between"
          >
            <div className="flex flex-row gap-150 items-center">
              {point.data.Icon ? (
                point.data.Icon
              ) : (
                <div
                  className="rounded-full w-[20px] h-[20px]"
                  style={{ background: point.serieColor }}
                />
              )}
              <div>{point.serieId}</div>
            </div>
            <div>{point.data.yFormatted}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
