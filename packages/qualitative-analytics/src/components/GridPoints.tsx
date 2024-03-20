import React from "react";
import { useClusterPoints } from "../hooks/useClusterPoints";
import { getWrapperPointStyle } from "../utils/getWrapperPointStyle";
import { getPointColor } from "../utils/getPointColor";
import { getBiggestCount } from "../utils/getClusterPointsCount";
import { ClusterPoint } from "../types";
import { NumberValue } from "./NumberValue";

const cellCount = 40;

interface GridPointProps {
  clusterPoint: ClusterPoint;
  cellHeight: number;
  cellWidth: number;
  biggestCount: number;
}
const GridPoint = ({
  clusterPoint,
  cellHeight,
  cellWidth,
  biggestCount,
}: GridPointProps) => {
  const sizeRatio = clusterPoint.click_count / biggestCount;
  const color = getPointColor(sizeRatio);

  const style = {
    height: cellHeight * sizeRatio,
    width: cellWidth * sizeRatio,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: color,
    borderRadius: "50%",
    opacity: 0.5,
    fontSize: "10px",
    fontWeight: "bold",
  } as any;

  if (sizeRatio < 0.05) {
    return null;
  }

  return (
    <div style={getWrapperPointStyle(clusterPoint, cellWidth, cellHeight)}>
      <div style={style}>
        <NumberValue value={clusterPoint.click_count} />
      </div>
    </div>
  );
};

export const GridPoints = () => {
  const clusterPoints = useClusterPoints();
  const biggestCount = getBiggestCount(clusterPoints);
  const pageWidth = window.innerWidth;
  const cellWidth = pageWidth / cellCount;
  const cellHeight = cellWidth;

  return (
    <>
      {clusterPoints.map((clusterPoint) => (
        <GridPoint
          clusterPoint={clusterPoint}
          cellHeight={cellHeight}
          cellWidth={cellWidth}
          biggestCount={biggestCount}
        />
      ))}
    </>
  );
};
