import { useEffect, useState } from "react";
import { useAuthToken } from "../context/AuthTokenContext";
import { getClusterPoints } from "../utils/getClusterPoints";
import { ClusterPoint } from "../types";

export const useClusterPoints = () => {
  const token = useAuthToken();
  const [cluserPoints, setClusterPoints] = useState<Array<ClusterPoint>>([]);

  useEffect(() => {
    if (!token) return;
    const search = new URLSearchParams(window.location.search);
    const projectId = search.get("__progressivelyProjectId");
    const viewportWidth = search.get("viewportWidth");

    if (projectId && viewportWidth) {
      getClusterPoints(projectId, 30, viewportWidth, token).then(
        setClusterPoints
      );
    }
  }, [token]);

  return cluserPoints;
};
