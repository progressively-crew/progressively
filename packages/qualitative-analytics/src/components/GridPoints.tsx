import React from "react";
import { useClusterPoints } from "../hooks/useClusterPoints";
import { getWrapperPointStyle } from "../utils/getWrapperPointStyle";
import { getPointColor } from "../utils/getPointColor";
import { getClusterPointsCount } from "../utils/getClusterPointsCount";
import { ClusterPoint } from "../types";

const cellCount = 40;

interface GridPointProps {
  clusterPoint: ClusterPoint;
  cellHeight: number;
  cellWidth: number;
  clusterPointsCount: number;
}
const GridPoint = ({
  clusterPoint,
  cellHeight,
  cellWidth,
  clusterPointsCount,
}: GridPointProps) => {
  const sizeRatio = clusterPoint.click_count / clusterPointsCount;
  const color = getPointColor(sizeRatio);

  const style = {
    height: cellHeight,
    width: cellWidth,
    background: color,
    borderRadius: "50%",
    opacity: 0.5,
  } as any;

  if (sizeRatio < 0.05) {
    return null;
  }

  return (
    <div style={getWrapperPointStyle(clusterPoint, cellWidth, cellHeight)}>
      <div style={style} />
    </div>
  );
};

export const GridPoints = () => {
  const clusterPoints = useClusterPoints();
  const clusterPointsCount = getClusterPointsCount(clusterPoints);

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
          clusterPointsCount={clusterPointsCount}
        />
      ))}
    </>
  );
};
