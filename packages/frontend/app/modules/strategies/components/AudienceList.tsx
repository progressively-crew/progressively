import { Spacer } from "~/components/Spacer";
import { Typography } from "~/components/Typography";
import { Li, Ul } from "~/components/Ul";
import { ComparatorEnum, AdditionalAudienceRetrieveDTO } from "../types";

export interface AudienceListProps {
  strat: AdditionalAudienceRetrieveDTO;
}

const Comparator = ({ comparator }: { comparator: ComparatorEnum }) => {
  if (comparator === ComparatorEnum.Equals) {
    return <span>equals</span>;
  }

  return null;
};

export const AudienceList = ({ strat }: AudienceListProps) => {
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
