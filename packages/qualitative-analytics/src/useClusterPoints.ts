import { useEffect, useState } from "react";
import { useAuthToken } from "./AuthTokenContext";
import { getClusterPoints } from "./getClusterPoints";
import { ClusterPoint } from "./types";

export const useClusterPoints = () => {
  const token = useAuthToken();
  const [cluserPoints, setClusterPoints] = useState<Array<ClusterPoint>>([]);

  useEffect(() => {
    if (!token) return;
    const search = new URLSearchParams(window.location.search);
    const projectId = search.get("__progressivelyProjectId");

    if (projectId) {
      getClusterPoints(projectId, 30, token).then(setClusterPoints);
    }
  }, [token]);

  return cluserPoints;
};
