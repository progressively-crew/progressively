import React, { useEffect, useState } from "react";

export const NumberValue = ({ value }: { value: number }) => {
  const [formattedValue, setFormattedValue] = useState("0");

  useEffect(() => {
    const formatter = new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 1,
    });
    setFormattedValue(formatter.format(value));
  }, [value]);

  return <>{formattedValue}</>;
};
