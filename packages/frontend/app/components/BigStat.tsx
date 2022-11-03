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
      <h2 id={id} className="font-semibold">
        {name}
      </h2>

      <div
        className={
          type === "variant"
            ? "text-indigo-700 text-4xl font-bold"
            : "text-orange-700 text-4xl font-bold"
        }
      >
        {formatterRef.current.format(count)} {unit && <span>{unit}</span>}
      </div>
    </div>
  );
};
