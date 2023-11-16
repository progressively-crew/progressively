export const formatDate = (utc: string) => {
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  };

  return new Intl.DateTimeFormat("default", options).format(new Date(utc));
};
