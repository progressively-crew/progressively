import { Spacer } from "~/components/Spacer";
import { Typography } from "~/components/Typography";
import { Li, Ul } from "~/components/Ul";
import { ComparatorEnum } from "~/modules/strategies/types";
import { Eligibility } from "../types";

export interface RestrictionListProps {
  eligibility: Eligibility;
}

const Comparator = ({ comparator }: { comparator: ComparatorEnum }) => {
  if (comparator === ComparatorEnum.Equals) {
    return <span>equals</span>;
  }

  return null;
};

export const RestrictionList = ({ eligibility }: RestrictionListProps) => {
  const targets = eligibility.fieldValue?.split("\n");

  return (
    <div>
      <Typography>
        <span>
          with <strong>{eligibility.fieldName}</strong>{" "}
          <strong>
            <Comparator
              comparator={eligibility.fieldComparator as ComparatorEnum}
            />
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
