import { Card, CardContent } from "~/components/Card";
import { Strategy } from "../types";
import { Form, useNavigation } from "@remix-run/react";
import { useId } from "react";
import { StrategyFormFields } from "./StrategyFormFields/StrategyFormFields";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { Variant } from "~/modules/variants/types";
import { Segment } from "~/modules/segments/types";
import { CreateButton } from "~/components/Buttons/CreateButton";
import { IconButton } from "~/components/Buttons/IconButton";
import { RuleList } from "./StrategyFormFields/RuleList";
import { Tag } from "~/components/Tag";
import { TbTrashX } from "react-icons/tb";

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

      <Card
        footer={
          <div className="flex flex-row gap-4">
            <SubmitButton
              form={updateStrategyFormId}
              loadingText="Saving the strategy..."
              isLoading={isEditingStrategy}
            >
              Save
            </SubmitButton>
          </div>
        }
      >
        <CardContent>
          <div className="flex flex-row gap-4 justify-between">
            <div className="flex-1">
              <div className="grid grid-cols-[70px_1fr] gap-x-4 gap-y-2">
                <div className="pt-2">
                  <Tag variant="PRIMARY">Serve</Tag>
                </div>

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
                </Form>

                <div className="pt-2">
                  {strategy.rules?.length > 0 && (
                    <Tag variant="PRIMARY">When</Tag>
                  )}
                </div>

                <div className="w-full">
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

                  <div className="pt-2">
                    <CreateButton
                      type="submit"
                      isLoading={isCreatingRule}
                      loadingText="Adding a rule..."
                      form={addStrategyRuleFormId}
                      variant="secondary"
                    >
                      Add a rule
                    </CreateButton>
                  </div>
                </div>
              </div>
            </div>

            <IconButton
              form={deleteStrategyFormId}
              type="submit"
              isLoading={isDeletingStrategy}
              loadingText="Deleting a strategy..."
              icon={<TbTrashX />}
              tooltip="Delete strategy"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
