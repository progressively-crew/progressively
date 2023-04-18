import { Card, CardContent } from "~/components/Card";
import { VariantDot } from "~/modules/variants/components/VariantDot";
import { Typography } from "~/components/Typography";

export interface MetricCardProps {
  variant?: string;
  metric: string;
  hit: number;
  children: React.ReactNode;
  ratio: string;
}

export const MetricCard = ({
  metric,
  hit,
  ratio,
  children,
  variant,
}: MetricCardProps) => {
  const formatter = Intl.NumberFormat("en", { notation: "compact" });

  return (
    <Card
      footer={
        <span>
          Ratio: <span className="font-bold">{ratio}</span>
        </span>
      }
    >
      <CardContent>
        <div className="pb-8">
          <Typography as="div" className="font-bold">
            {metric}
          </Typography>
          {variant ? (
            <div className="flex flex-row gap-2 items-center">
              <VariantDot variant={variant} />
              <Typography className="text-sm text-gray-600">
                Attached to variant {variant}
              </Typography>
            </div>
          ) : (
            <div>
              <Typography className="text-sm text-gray-600">
                Not attached to a variant
              </Typography>
            </div>
          )}
        </div>

        <div className="dark:text-white text-slate-900 pb-8">
          <span className="text-5xl font-bold">{formatter.format(hit)}</span>
          <span className="dark:text-slate-300 text-slate-900 pl-2">hits.</span>
        </div>

        {children}
      </CardContent>
    </Card>
  );
};
