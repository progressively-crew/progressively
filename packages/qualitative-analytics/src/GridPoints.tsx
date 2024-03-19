import React from "react";
import { useClusterPoints } from "./useClusterPoints";
import { ClusterPoint } from "./types";

export const GridPoints = () => {
  const clusterPoints = useClusterPoints();
  const clusterPointCounts = clusterPoints.reduce(
    (acc, curr) => acc + curr.click_count,
    0
  );

  const getPointStyle = (clusterPoint: ClusterPoint) => {
    const p = (clusterPoint.click_count / clusterPointCounts) * 100;

    const color =
      p < 20 ? "green" : p < 33 ? "yellow" : p < 66 ? "orange" : "red";

    return {
      position: "absolute",
      zIndex: 9999,
      background: color,
      left: `${clusterPoint.grid_x_percent}%`,
      top: `${clusterPoint.grid_y_percent}%`,
      width: p,
      height: p,
      borderRadius: "50%",
    } as any;
  };

  return (
    <>
      {clusterPoints.map((clusterPoint) => (
        <div style={getPointStyle(clusterPoint)} />
      ))}
    </>
  );
};
