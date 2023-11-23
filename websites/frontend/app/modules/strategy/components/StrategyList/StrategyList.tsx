import { Strategy } from "../../types";
import { Variant } from "~/modules/variants/types";
import { Segment } from "~/modules/segments/types";
import { StrategyItem } from "./StrategyListItem";

export interface StrategyListProps {
  items: Array<Strategy>;
  variants: Array<Variant>;
  segments: Array<Segment>;
}

export const StrategyList = ({
  items,
  variants,
  segments,
}: StrategyListProps) => {
  return (
    <div className="flex flex-col gap-2">
      {items.map((strategy, index) => {
        return (
          <StrategyItem
            key={strategy.uuid}
            strategy={strategy}
            variants={variants}
            segments={segments}
            index={index + 1}
          />
        );
      })}
    </div>
  );
};
