import React from "react";
import { useClusterPoints } from "./useClusterPoints";
import { ClusterPoint } from "./types";

const gridCols = 20;

export const GridPoints = () => {
  const clusterPoints = useClusterPoints();
  const cellHeight = window.innerWidth / gridCols;

  const clusterPointCounts = clusterPoints.reduce(
    (acc, curr) => acc + curr.click_count,
    0
  );

  let maxRow = 0;

  for (const clusterPoint of clusterPoints) {
    if (clusterPoint.grid_y_percent > maxRow) {
      maxRow = clusterPoint.grid_y_percent;
    }
  }

  const getWrapperPointStyle = (clusterPoint: ClusterPoint) => {
    const left = `${(clusterPoint.grid_x_percent / gridCols) * 100}%`;
    const top = `${(clusterPoint.grid_y_percent / gridCols) * 100}%`;

    return {
      position: "absolute",
      left,
      top,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    } as any;
  };

  const getPointStyle = (clusterPoint: ClusterPoint) => {
    const p = (clusterPoint.click_count / clusterPointCounts) * 100;

    const color =
      p < 20 ? "green" : p < 33 ? "yellow" : p < 66 ? "orange" : "red";

    return {
      height: p,
      width: p,
      background: color,
      borderRadius: "50%",
    } as any;
  };

  return (
    <>
      {clusterPoints.map((clusterPoint) => (
        <div style={getWrapperPointStyle(clusterPoint)}>
          <div style={getPointStyle(clusterPoint)} />
        </div>
      ))}
    </>
  );
};
