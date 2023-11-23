import { Strategy } from "../../types";
import { Variant } from "~/modules/variants/types";
import { Segment } from "~/modules/segments/types";
import { StrategyItem } from "./StrategyListItem";
import { Form } from "@remix-run/react";
import { Button } from "~/components/Buttons/Button";

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
    <div>
      {items.map((strategy) => {
        const id = `delete-strategy-${strategy.uuid}`;

        return (
          <Form method="post" id={id} key={id}>
            <input type="hidden" value="delete-strategy" name="_type" />
            <input type="hidden" value={strategy.uuid} name="uuid" />
          </Form>
        );
      })}

      <Form method="post">
        <Button type="submit">Save strategies</Button>
        <input type="hidden" value="edit-strategy" name="_type" />

        <div className="flex flex-col gap-2 pt-4">
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
      </Form>
    </div>
  );
};
