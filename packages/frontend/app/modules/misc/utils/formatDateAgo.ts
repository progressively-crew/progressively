import { format } from "timeago.js";

export const formatDateAgo = (utc: string) => {
  return format(utc);
};
