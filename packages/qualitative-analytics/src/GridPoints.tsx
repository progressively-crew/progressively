import React from "react";
import { useClusterPoints } from "./useClusterPoints";
import { ClusterPoint } from "./types";

const cellCount = 40;
export const GridPoints = () => {
  const clusterPoints = useClusterPoints();

  const clusterPointCounts = clusterPoints.reduce(
    (acc, curr) => acc + curr.click_count,
    0
  );

  const pageWidth = window.innerWidth;
  const cellWidth = pageWidth / cellCount;
  const cellHeight = cellWidth;

  const getWrapperPointStyle = (clusterPoint: ClusterPoint) => {
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

  return (
    <>
      {clusterPoints.map((clusterPoint) => {
        const p = (clusterPoint.click_count / clusterPointCounts) * 100;

        const color =
          p < 20 ? "green" : p < 33 ? "yellow" : p < 66 ? "orange" : "red";

        const style = {
          height: cellHeight,
          width: cellWidth,
          background: color,
          borderRadius: "50%",
          opacity: 0.5,
        } as any;

        if (p < 5) {
          return null;
        }

        return (
          <div style={getWrapperPointStyle(clusterPoint)}>
            <div style={style} />
          </div>
        );
      })}
    </>
  );
};
