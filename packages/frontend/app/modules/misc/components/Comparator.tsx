import { ComparatorEnum } from "~/modules/strategies/types";

export const Comparator = ({ comparator }: { comparator: ComparatorEnum }) => {
  if (comparator === ComparatorEnum.Equals) {
    return <span>equals</span>;
  }

  if (comparator === ComparatorEnum.Contains) {
    return <span>contains</span>;
  }

  return null;
};
