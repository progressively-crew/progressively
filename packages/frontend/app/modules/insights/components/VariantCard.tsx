import { Tag } from "~/components/Tag";
import { stringToColor } from "~/modules/misc/utils/stringToColor";

export interface VariantCardProps {
  variant: string;
  hit: number;
  ratio: number;
}

export const VariantCard = ({ variant, hit, ratio }: VariantCardProps) => {
  const color = stringToColor(variant, 75);
  const formatter = Intl.NumberFormat("en", { notation: "compact" });

  return (
    <div className="border border-gray-100 rounded-md bg-white dark:border-slate-700 dark:bg-slate-800 p-4">
      <div className="flex flex-row items-center gap-2 font-bold pb-2">
        <div className="h-6 w-6 rounded" style={{ background: color }} />
        <p style={{ color }}>{variant}</p>
      </div>

      <div className="dark:text-white text-slate-900 pb-4">
        <span className="text-6xl font-bold">{formatter.format(hit)}</span>
        <span className="dark:text-slate-300 text-slate-900 pl-2">eval.</span>
      </div>

      <Tag style={{ background: color }} className="!text-slate-900">
        {ratio}%
      </Tag>
    </div>
  );
};
