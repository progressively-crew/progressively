import { useSearchParams } from "@remix-run/react";
import { Card } from "~/components/Card";

export const InsightsFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const days = searchParams.get("days") || "7";

  const shareButtonClass =
    "py-1 px-4 gap-4 bg-transparent hover:bg-gray-100 relative whitespace-nowrap inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none";

  const activeClass = `!bg-gray-100`;

  const setDays = (d: number) =>
    setSearchParams((prev) => {
      prev.set("days", String(d));
      return prev;
    });

  return (
    <Card>
      <div className="inline-flex flex-row gap-1 px-1 py-1 items-center">
        <button
          onClick={() => setDays(7)}
          className={`${shareButtonClass} ${days === "7" ? activeClass : ""}`}
        >
          7 days
        </button>

        <button
          onClick={() => setDays(30)}
          className={`${shareButtonClass} ${days === "30" ? activeClass : ""}`}
        >
          30 days
        </button>

        <button
          onClick={() => setDays(90)}
          className={`${shareButtonClass} ${days === "90" ? activeClass : ""}`}
        >
          90 days
        </button>
      </div>
    </Card>
  );
};
