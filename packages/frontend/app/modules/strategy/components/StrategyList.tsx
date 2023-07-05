import { Card, CardContent } from "~/components/Card";
import { Strategy } from "../types";
import { Form, useNavigation } from "@remix-run/react";
import { useId, useRef } from "react";
import { StrategyFormFields } from "./StrategyFormFields/StrategyFormFields";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { MenuButton } from "~/components/MenuButton";
import { Variant } from "~/modules/variants/types";
import { IoCloseOutline } from "react-icons/io5";
import { StrategyRuleFormField } from "./StrategyRuleFormField";
import { Segment } from "~/modules/segments/types";
import { Typography } from "~/components/Typography";
import { Spinner } from "~/components/Spinner";
import { CreateButton } from "~/components/Buttons/CreateButton";
import { IconButton } from "~/components/Buttons/IconButton";

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
    <Card
      footer={
        <div className="flex flex-row gap-4">
          <div className="px-1">
            <CreateButton
              type="submit"
              isLoading={isCreatingRule}
              loadingText="Adding a rule..."
              form={addStrategyRuleFormId}
              variant="secondary"
            >
              <Typography as="span">Add a rule</Typography>
            </CreateButton>
          </div>

          <SubmitButton
            form={updateStrategyFormId}
            loadingText="Saving the strategy..."
            isLoading={isEditingStrategy}
          >
            Save
          </SubmitButton>

          <Form method="post" id={deleteStrategyFormId}>
            <input type="hidden" value="delete-strategy" name="_type" />
            <input type="hidden" value={strategy.uuid} name="uuid" />
          </Form>
        </div>
      }
    >
      <Form method="post" id={deleteStrategyRule}>
        <input type="hidden" value="delete-strategy-rule" name="_type" />
      </Form>

      <Form method="post" id={addStrategyRuleFormId}>
        <input type="hidden" value="add-strategy-rule" name="_type" />
        <input type="hidden" value={strategy.uuid} name="uuid" />
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

            <IconButton
              form={deleteStrategyFormId}
              type="submit"
              isLoading={isDeletingStrategy}
              loadingText="Deleting a strategy..."
              icon={<IoCloseOutline />}
              tooltip="Delete strategy"
            />
          </div>
        </CardContent>

        <div className={`flex flex-col gap-1 pb-1`}>
          {strategy.rules?.map((rule, index) => {
            const isDeletingRule =
              type === "delete-strategy-rule" &&
              navigation?.formData?.get("ruleId")?.toString() === rule.uuid;

            return (
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

                    <IconButton
                      form={deleteStrategyRule}
                      type="submit"
                      isLoading={isDeletingRule}
                      loadingText="Deleting a rule..."
                      icon={<IoCloseOutline />}
                      tooltip="Remove rule"
                      value={rule.uuid}
                      name="ruleId"
                    />
                  </div>
                </div>

                {index !== strategy.rules!.length - 1 && (
                  <span className="-mt-3 absolute text-center bg-white rounded-full h-6 w-12 text-xs text-gray-500 flex items-center justify-center left-1/2 -ml-6">
                    OR
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </Form>
    </Card>
  );
};
