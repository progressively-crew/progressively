import { useEffect, useState } from "react";
import { useAuthToken } from "../context/AuthTokenContext";
import { getEventsPerSelector } from "../utils/getEventsPerSelector";
import { ProgressivelyEventSelector } from "../types";

export const useEvents = () => {
  const token = useAuthToken();
  const [events, setEvents] = useState<Array<ProgressivelyEventSelector>>([]);

  useEffect(() => {
    if (!token) return;
    const search = new URLSearchParams(window.location.search);
    const projectId = search.get("__progressivelyProjectId");

    if (projectId) {
      getEventsPerSelector(projectId, window.location.pathname, 30, token).then(
        setEvents
      );
    }
  }, [token]);

  const totalEvents = (events || []).reduce(
    (acc, curr) => acc + curr.eventCount,
    0
  );

  return { events, totalEvents };
};
