import React, { useEffect } from "react";
import { useAuthToken } from "./AuthTokenContext";
import { getClusterPoints } from "./getClusterPoints";

export const GridPoints = () => {
  const token = useAuthToken();

  useEffect(() => {
    if (!token) return;
    const search = new URLSearchParams(window.location.search);
    const projectId = search.get("__progressivelyProjectId");

    if (projectId) {
      getClusterPoints(projectId, 30, token);
    }
  }, [token]);

  return <div>{token}</div>;
};
