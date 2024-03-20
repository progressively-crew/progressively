import { ClusterPoint } from "../types";

export const getWrapperPointStyle = (
  clusterPoint: ClusterPoint,
  cellWidth: number,
  cellHeight: number
) => {
  const left = `${clusterPoint.grid_x_percent * cellWidth}px`;
  const top = `${clusterPoint.grid_y_percent * cellHeight}px`;

  return {
    position: "absolute",
    height: cellHeight,
    width: cellWidth,
    left,
    top,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  } as any;
};
