import { Card, CardContent } from "~/components/Card";
import { VariantDot } from "~/modules/variants/components/VariantDot";
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
    <div className="min-w-[200px]">
      <Card
        footer={
          <span>
            Ratio: <span className="font-bold">{ratio}%</span>
          </span>
        }
      >
        <CardContent>
          <div className="flex flex-row items-center gap-2 font-bold pb-4">
            <VariantDot variant={variant} size="L" />
            <p style={{ color }}>{variant}</p>
          </div>

          <div className="dark:text-white text-slate-900 pb-4">
            <span className="text-5xl font-bold">{formatter.format(hit)}</span>
            <span className="dark:text-slate-300 text-slate-900 pl-2">
              eval.
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
