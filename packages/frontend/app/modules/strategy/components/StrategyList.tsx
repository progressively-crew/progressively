import { Card, CardContent } from "~/components/Card";
import { Strategy } from "../types";
import { Form, useNavigation } from "@remix-run/react";
import { useId } from "react";
import { StrategyFormFields } from "./StrategyFormFields/StrategyFormFields";
import { Variant } from "~/modules/variants/types";
import { Segment } from "~/modules/segments/types";
import { IconButton } from "~/components/Buttons/IconButton";
import { RuleList } from "./StrategyFormFields/RuleList";
import { PiTrashThin, PiPlusSquareThin } from "react-icons/pi";
import { VscSave } from "react-icons/vsc";

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
    <div className="flex flex-col gap-8">
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
  const navigation = useNavigation();

  const type = navigation?.formData?.get("_type");
  const isCreatingRule =
    type === "add-strategy-rule" &&
    navigation?.formData?.get("uuid")?.toString() === strategy.uuid;

  const isEditingStrategy =
    type === "edit-strategy" &&
    navigation?.formData?.get("uuid")?.toString() === strategy.uuid;

  const isDeletingStrategy =
    type === "delete-strategy" &&
    navigation?.formData?.get("uuid")?.toString() === strategy.uuid;

  const id = useId();
  const updateStrategyFormId = `update-strategy-${id}`;
  const deleteStrategyFormId = `delete-strategy-${id}`;
  const deleteStrategyRule = `delete-strategy-rule-${id}`;
  const addStrategyRuleFormId = `add-strategy-rule-${id}`;

  return (
    <div>
      <Form method="post" id={deleteStrategyFormId}>
        <input type="hidden" value="delete-strategy" name="_type" />
        <input type="hidden" value={strategy.uuid} name="uuid" />
      </Form>

      <Form method="post" id={deleteStrategyRule}>
        <input type="hidden" value="delete-strategy-rule" name="_type" />
      </Form>

      <Form method="post" id={addStrategyRuleFormId}>
        <input type="hidden" value="add-strategy-rule" name="_type" />
        <input type="hidden" value={strategy.uuid} name="uuid" />
      </Form>

      <div className="inline-flex flex-row gap-4 px-4 rounded-full py-1 bg-slate-100 mb-2">
        <IconButton
          form={updateStrategyFormId}
          loadingText="Saving the strategy..."
          isLoading={isEditingStrategy}
          type="submit"
          icon={<VscSave className="text-xl text-purple-900" />}
          tooltip="Save strategy"
        />

        <IconButton
          type="submit"
          isLoading={isCreatingRule}
          loadingText="Adding a rule..."
          form={addStrategyRuleFormId}
          icon={<PiPlusSquareThin className="text-xl" />}
          tooltip="Add a rule"
        />

        <IconButton
          form={deleteStrategyFormId}
          type="submit"
          isLoading={isDeletingStrategy}
          loadingText="Deleting a strategy..."
          icon={<PiTrashThin className="text-xl" />}
          tooltip="Delete strategy"
        />
      </div>

      <Card>
        <CardContent>
          <div className="pt-2">
            <Form method="post" className="block" id={updateStrategyFormId}>
              <input type="hidden" value="edit-strategy" name="_type" />
              <input type="hidden" value={strategy.uuid} name="uuid" />

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

              <div className="w-full pt-2">
                <RuleList
                  rules={strategy.rules || []}
                  currentlyDeletingRuleUuid={
                    type === "delete-strategy-rule"
                      ? navigation?.formData?.get("ruleId")?.toString()
                      : undefined
                  }
                  formId={deleteStrategyRule}
                  segments={segments}
                />
              </div>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
