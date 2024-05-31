export const formatDate = (
  x: any,
  options: Intl.DateTimeFormatOptions = {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
  }
) => {
  const formatter = new Intl.DateTimeFormat(undefined, options);
  return formatter.format(new Date(x));
};
