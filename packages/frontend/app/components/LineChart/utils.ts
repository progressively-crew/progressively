export const formatDate = (date: string) => {
  return new Intl.DateTimeFormat().format(new Date(date));
};
