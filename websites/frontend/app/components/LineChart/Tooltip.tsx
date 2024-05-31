import type { Point, SliceTooltipProps } from "@nivo/line";
import type { ReactNode } from "react";
import { formatDate } from "./formatters";

type LineChartPoint = { data: Point["data"] & { Icon?: ReactNode } } & Point;

export const Tooltip = ({ slice }: SliceTooltipProps) => {
  const xFormatted = formatDate(slice.points[0].data.x);

  return (
    <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200 min-w-[160px]">
      <p className="font-bold text-sm">{xFormatted}</p>
      <ul className="pt-3 flex flex-col gap-2">
        {slice.points.map((point: LineChartPoint) => (
          <li
            key={point.id}
            className="text-sm text-gray-700 flex flex-row items-center justify-between"
          >
            <div className="flex flex-row gap-3 items-center">
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
            <div>
              <strong>{point.data.yFormatted}</strong>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
