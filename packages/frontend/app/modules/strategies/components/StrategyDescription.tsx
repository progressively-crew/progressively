import { Tag } from "~/components/Tag";
import { Typography } from "~/components/Typography";

export interface StrategyDescriptionProps {
  hasStrategies: boolean;
  rolloutPercentage: number;
}
export const StrategyDescription = ({
  hasStrategies,
  rolloutPercentage,
}: StrategyDescriptionProps) => {
  if (rolloutPercentage === 100) {
    return (
      <Typography>
        <Tag>{rolloutPercentage}%</Tag> of the audience will resolve the{" "}
        <strong>"true"</strong> variant of the flag.
      </Typography>
    );
  }

  if (hasStrategies) {
    return (
      <Typography>
        <Tag>{rolloutPercentage}%</Tag> of the audience plus the users matching
        at least one of the following strategies will resolve the{" "}
        <strong>"true"</strong> variant of the flag.
      </Typography>
    );
  }

  return (
    <Typography>
      <Tag>{rolloutPercentage}%</Tag> of the audience will resolve the{" "}
      <strong>"true"</strong> variant of the flag.
    </Typography>
  );
};
