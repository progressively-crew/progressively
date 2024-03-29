import { Card, CardContent } from "./Card";
import { NumberValue } from "./NumberValue";
import { Tag } from "./Tag";
import { Typography } from "./Typography";

export interface BigStatProps {
  label: string;
  value: number;
  unit?: string;
  icon: React.ReactNode;
  detail?: React.ReactNode;
  evolution?: number;
}

export const BigStat = ({
  label,
  value,
  unit,
  icon,
  detail,
  evolution,
}: BigStatProps) => {
  return (
    <Card>
      <CardContent>
        <div className="flex flex-row gap-8">
          <dl>
            <Typography as="dt" className="text-xs text-slate-500 uppercase">
              {label}
            </Typography>

            <Typography as="dd" className="text-3xl">
              <strong>
                <NumberValue value={value} />
              </strong>{" "}
              <span className="inline-flex flex-row items-center">
                <span className="text-slate-500 text-xl">{unit}</span>
                {evolution && evolution !== 0 ? (
                  <span className="text-xs ml-2">
                    <Tag
                      size="S"
                      variant={
                        evolution > 0
                          ? "SUCCESS"
                          : evolution < 0
                          ? "DANGER"
                          : "DEFAULT"
                      }
                    >
                      {evolution}%
                    </Tag>
                  </span>
                ) : null}
              </span>
            </Typography>

            {detail && (
              <Typography as="p" className="text-slate-500 text-xs">
                {detail}
              </Typography>
            )}
          </dl>

          {icon}
        </div>
      </CardContent>
    </Card>
  );
};
