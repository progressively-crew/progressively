import React from "react";
import { useClusterPoints } from "./useClusterPoints";
import { ClusterPoint } from "./types";

export const GridPoints = () => {
  const clusterPoints = useClusterPoints();

  const getPointStyle = (clusterPoint: ClusterPoint) => {
    return {
      position: "absolute",
      zIndex: 9999,
      background: "red",
      left: `${clusterPoint.grid_x_percent}%`,
      top: `${clusterPoint.grid_y_percent}%`,
      width: 10,
      height: 10,
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
