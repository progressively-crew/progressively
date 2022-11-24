import { Spacer } from "~/components/Spacer";
import { Typography } from "~/components/Typography";
import { Li, Ul } from "~/components/Ul";
import { ComparatorEnum, AdditionalAudienceRetrieveDTO } from "../types";

export interface StrategyTargetingProps {
  strat: AdditionalAudienceRetrieveDTO;
}

const Comparator = ({ comparator }: { comparator: ComparatorEnum }) => {
  if (comparator === ComparatorEnum.Equals) {
    return <span>equals</span>;
  }

  return null;
};

const StrategyCriteriaField = ({ strat }: StrategyTargetingProps) => {
  const targets = strat.fieldValue?.split("\n");

  return (
    <div>
      <Typography>
        <span>
          with <strong>{strat.fieldName}</strong>{" "}
          <strong>
            <Comparator comparator={strat.fieldComparator as ComparatorEnum} />
          </strong>{" "}
          <span>to one of:</span>
        </span>
      </Typography>

      <Spacer size={2} />

      <Ul>
        {targets?.map((target) => (
          <Li key={target}>{target}</Li>
        ))}
      </Ul>
    </div>
  );
};

export const StrategyCriteria = ({ strat }: StrategyTargetingProps) => {
  return <StrategyCriteriaField strat={strat} />;
};
