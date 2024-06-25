import { Strategy } from "../../types";
import { Variant } from "~/modules/variants/types";
import { StrategyItem } from "./StrategyListItem";
import { Form } from "@remix-run/react";
import React from "react";
import { Segment } from "~/modules/segments/types";

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

      <Form method="post" id="save-strategies">
        <input type="hidden" value="edit-strategy" name="_type" />

        <div className="flex flex-col gap-2 pt-4">
          {items.map((strategy, index) => {
            return (
              <React.Fragment key={strategy.uuid}>
                {index > 0 && (
                  <div className="flex justify-center items-center relative">
                    <div className="z-10 uppercase font-mono text-xs inline-block rounded-full px-4 py-1 text-gray-900 bg-gray-100">
                      Or
                    </div>
                    <div className="absolute h-px w-3/4 border-t border-dashed" />
                  </div>
                )}
                <StrategyItem
                  strategy={strategy}
                  variants={variants}
                  segments={segments}
                  index={index}
                />
              </React.Fragment>
            );
          })}
        </div>
      </Form>
    </div>
  );
};
