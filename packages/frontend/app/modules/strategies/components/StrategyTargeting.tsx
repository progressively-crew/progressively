import { Spacer } from "~/components/Spacer";
import { Typography } from "~/components/Typography";
import { Li, Ul } from "~/components/Ul";
import { ComparatorEnum, StrategyRetrieveDTO } from "../types";

export interface StrategyTargetingProps {
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

  if (strat.rolloutPercentage < 100) {
    targetedUsers = `${strat.rolloutPercentage}% of the people`;
  }

  if (strat.strategyRuleType === "field") {
    fieldName = strat.fieldName;
  }

  return (
    <Typography size="uranus">
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

export const StrategyTargeting = ({ strat }: StrategyTargetingProps) => {
  return (
    <div>
      <StrategyAudience strat={strat} />
      <Spacer size={2} />

      <StrategyTargetConstraints strat={strat} />
    </div>
  );
};
