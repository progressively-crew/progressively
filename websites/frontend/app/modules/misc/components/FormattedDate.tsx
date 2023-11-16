import { useState, useEffect } from "react";
import { formatDate } from "../utils/formatDate";

export const FormattedDate = ({ utc }: { utc: string }) => {
  const [formatted, setFormatted] = useState<string>();

  useEffect(() => {
    setFormatted(formatDate(utc));
  }, []);

  if (!formatted) return null;

  return <time dateTime={utc}>{formatted}</time>;
};
