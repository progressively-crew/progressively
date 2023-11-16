import { Card, CardContent } from "./Card";
import { NumberValue } from "./NumberValue";
import { Typography } from "./Typography";

export interface BigStatProps {
  label: string;
  value: number;
  unit: string;
  icon: React.ReactNode;
}

export const BigStat = ({ label, value, unit, icon }: BigStatProps) => {
  return (
    <Card>
      <CardContent>
        <div className="flex flex-row gap-4 items-center">
          <div>
            <Typography className="text-xs text-slate-500 dark:text-slate-300 uppercase">
              {label}
            </Typography>
            <Typography as="h2" className="text-3xl">
              <strong>
                <NumberValue value={value} />
              </strong>{" "}
              <span className="text-slate-500 dark:text-slate-300 text-xl">
                {unit}
              </span>
            </Typography>
          </div>

          {icon}
        </div>
      </CardContent>
    </Card>
  );
};