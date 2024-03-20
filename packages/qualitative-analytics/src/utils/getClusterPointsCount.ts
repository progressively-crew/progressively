import { ClusterPoint } from "../types";

export const getBiggestCount = (clusterPoints: Array<ClusterPoint>) => {
  let biggestCount = 0;
  for (const clusterPoint of clusterPoints) {
    if (biggestCount < clusterPoint.click_count) {
      biggestCount = clusterPoint.click_count;
    }
  }

  return biggestCount;
};
