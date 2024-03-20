import { ClusterPoint } from "../types";

export const getClusterPointsCount = (clusterPoints: Array<ClusterPoint>) => {
  let count = 0;

  for (const clusterPoint of clusterPoints) {
    count += clusterPoint.click_count;
  }

  return count;
};
