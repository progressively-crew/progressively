import { useRef } from "react";

export interface BigStatProps {
  name: string;
  id?: string;
  unit?: string;
  count: number;
  type?: "variant";
}

export const BigStat = ({ name, count, id, unit, type }: BigStatProps) => {
  const formatterRef = useRef(
    new Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 1,
    })
  );

  return (
    <div>
      <h2 id={id}>{name}</h2>

      <div style={{ color: type === "variant" ? "red" : "blue" }}>
        {formatterRef.current.format(count)} {unit && <span>{unit}</span>}
      </div>
    </div>
  );
};
