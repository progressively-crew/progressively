import { Button } from "~/components/Buttons/Button";
import { Card, CardContent, CardHeader } from "~/components/CardGroup";
import { Spacer } from "~/components/Spacer";
import { Typography } from "~/components/Typography";
import { Li, Ul } from "~/components/Ul";
import { VisuallyHidden } from "~/components/VisuallyHidden";
import { ComparatorEnum, StrategyRetrieveDTO } from "../types";

export interface StrategyCardProps {
  flagId: string;
  projectId: string;
  envId: string;
  strat: StrategyRetrieveDTO;
}

const mapStrategyComparator = (comparatorEnum: ComparatorEnum) => {
  switch (comparatorEnum) {
    default:
    case ComparatorEnum.Equals: {
      return "equals";
    }

    case ComparatorEnum.NotEquals: {
      return "does not equal";
    }
  }
};

const StrategyAudience = ({ strat }: { strat: StrategyRetrieveDTO }) => {
  let targetedUsers = "all the people";
  let fieldName = undefined;

  if (strat.activationType === "percentage") {
    targetedUsers = `${strat.rolloutPercentage}% of the people`;
  }

  if (strat.strategyRuleType === "field") {
    fieldName = strat.fieldName;
  }

  return (
    <Typography>
      Serve the flag to <strong>{targetedUsers}</strong>{" "}
      {fieldName ? (
        <span>
          with <strong>email</strong>{" "}
          <strong>
            {mapStrategyComparator(strat.fieldComparator as ComparatorEnum)}
          </strong>{" "}
          <span>to one of:</span>
        </span>
      ) : null}
    </Typography>
  );
};

const StrategyTargetConstraints = ({
  strat,
}: {
  strat: StrategyRetrieveDTO;
}) => {
  if (strat.strategyRuleType === "default") {
    return null;
  }

  if (strat.strategyRuleType === "field") {
    const targets = strat.fieldValue?.split("\n");

    return (
      <Ul>
        {targets?.map((target) => (
          <Li key={target}>{target}</Li>
        ))}
      </Ul>
    );
  }

  return null;
};

export const StrategyCard = ({
  flagId,
  projectId,
  envId,
  strat,
}: StrategyCardProps) => {
  return (
    <Card>
      <CardHeader as="h3" id={strat.uuid}>
        {strat.name}
      </CardHeader>

      <CardContent>
        <StrategyAudience strat={strat} />

        <StrategyTargetConstraints strat={strat} />

        <Spacer size={8} />

        <Button
          to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/strategies/${strat.uuid}/delete`}
        >
          Remove<VisuallyHidden> {strat.name}</VisuallyHidden>
        </Button>
      </CardContent>
    </Card>
  );
};
