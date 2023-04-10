import { Card, CardContent } from "~/components/Card";
import { Strategy } from "../types";
import { Form } from "@remix-run/react";
import { useId, useRef } from "react";
import { StrategyFormFields } from "./StrategyFormFields";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { MenuButton } from "~/components/MenuButton";
import { Variant } from "~/modules/variants/types";
import { IoCloseOutline } from "react-icons/io5";
import { StrategyRuleFormField } from "./StrategyRuleFormField";
import { Segment } from "~/modules/segments/types";
import { DashedButton } from "~/components/Buttons/DashedButton";
import { Typography } from "~/components/Typography";

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
    <div className="flex flex-col gap-4">
      {items.map((strategy) => {
        return (
          <StrategyItem
            key={strategy.uuid}
            strategy={strategy}
            variants={variants}
            segments={segments}
          />
        );
      })}
    </div>
  );
};

export interface StrategyItemProps {
  strategy: Strategy;
  variants: Array<Variant>;
  segments: Array<Segment>;
}

const StrategyItem = ({ strategy, variants, segments }: StrategyItemProps) => {
  const deleteStrategyForm = useRef<HTMLFormElement>(null);

  const id = useId();
  const updateStrategyFormId = `update-strategy-${id}`;
  const deleteStrategyRule = `delete-strategy-rule-${id}`;

  return (
    <Card
      footer={
        <div>
          <SubmitButton form={updateStrategyFormId}>Save</SubmitButton>

          <Form method="post" ref={deleteStrategyForm}>
            <input type="hidden" value="delete-strategy" name="_type" />
            <input type="hidden" value={strategy.uuid} name="uuid" />
          </Form>
        </div>
      }
    >
      <Form method="post" id={deleteStrategyRule}>
        <input type="hidden" value="delete-strategy-rule" name="_type" />
      </Form>

      <Form method="post" className="block" id={updateStrategyFormId}>
        <input type="hidden" value="edit-strategy" name="_type" />
        <input type="hidden" value={strategy.uuid} name="uuid" />
        <CardContent>
          <div className="flex flex-row gap-4 justify-between">
            <StrategyFormFields
              valueToServe={strategy.valueToServe}
              valueToServeType={strategy.valueToServeType}
              variants={variants.map((variant) => {
                const rolloutPercentage =
                  strategy.variants?.find(
                    (sv) => sv.variantUuid === variant.uuid
                  )?.rolloutPercentage || 0;

                return {
                  ...variant,
                  rolloutPercentage,
                };
              })}
              rolloutPercentage={strategy.rolloutPercentage || 0}
            />

            <MenuButton
              items={[
                {
                  label: "Delete strategy",
                  noInitial: true,
                  onClick: () => {
                    deleteStrategyForm.current?.submit();
                  },
                },
              ]}
              label={"Actions on strategy"}
            />
          </div>
        </CardContent>

        <div className={`flex flex-col gap-1 pb-1`}>
          {strategy.rules?.map((rule, index) => (
            <div key={rule.uuid}>
              <div className="bg-gray-50 dark:bg-slate-900 px-6 py-4">
                <input type="hidden" value={rule.uuid} name="ruleUuid" />
                <div className="flex flex-row gap-4 justify-between items-start">
                  <div className="flex-1">
                    <StrategyRuleFormField
                      initialFieldName={rule.fieldName}
                      initialFieldComparator={rule.fieldComparator}
                      initialFieldValue={rule.fieldValue}
                      initialSegmentUuid={rule.segmentUuid}
                      segments={segments}
                    />
                  </div>

                  <button
                    type="submit"
                    value={rule.uuid}
                    form={deleteStrategyRule}
                    name="ruleId"
                    className="rounded bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-100 dark:hover:text-slate-100 w-6 h-8 flex items-center justify-center"
                  >
                    <IoCloseOutline title="Remove rule" />
                  </button>
                </div>
              </div>

              {index !== strategy.rules!.length - 1 && (
                <span className="-mt-3 absolute text-center bg-white rounded-full h-6 w-12 text-xs text-gray-500 flex items-center justify-center left-1/2 -ml-6">
                  OR
                </span>
              )}
            </div>
          ))}

          <div className="px-1">
            <Form method="post">
              <input type="hidden" value="add-strategy-rule" name="_type" />
              <input type="hidden" value={strategy.uuid} name="uuid" />

              <DashedButton type="submit">
                <Typography as="span">Add a rule</Typography>
              </DashedButton>
            </Form>
          </div>
        </div>
      </Form>
    </Card>
  );
};
