import { Card, CardContent } from "./Card";
import { NumberValue } from "./NumberValue";
import { Tag, TagProps } from "./Tag";
import { Typography } from "./Typography";

export interface BigStatProps {
  label: string;
  value: number;
  unit?: string;
  icon: React.ReactNode;
  detail?: React.ReactNode;
  evolution?: number;
  inverse?: boolean;
}

const getVariant = (
  evolution: number,
  inverse: boolean
): TagProps["variant"] => {
  if (inverse) {
    return evolution > 0 ? "DANGER" : evolution < 0 ? "SUCCESS" : "DEFAULT";
  }

  return evolution > 0 ? "SUCCESS" : evolution < 0 ? "DANGER" : "DEFAULT";
};

export const BigStat = ({
  label,
  value,
  unit,
  icon,
  detail,
  evolution,
  inverse,
}: BigStatProps) => {
  const variant = evolution
    ? getVariant(evolution, Boolean(inverse))
    : "DEFAULT";

  return (
    <Card>
      <CardContent>
        <div className="flex flex-row gap-8">
          <dl>
            <Typography as="dt" className="text-xs text-gray-500 uppercase">
              {label}
            </Typography>

            <Typography as="dd" className="text-3xl">
              <strong>
                <NumberValue value={value} />
              </strong>{" "}
              <span className="inline-flex flex-row items-center">
                <span className="text-gray-500 text-xl">{unit}</span>
                {evolution && evolution !== 0 ? (
                  <span className="text-xs ml-2">
                    <Tag size="S" variant={variant}>
                      {evolution}%
                    </Tag>
                  </span>
                ) : null}
              </span>
            </Typography>

            {detail && (
              <Typography as="p" className="text-gray-500 text-xs">
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
