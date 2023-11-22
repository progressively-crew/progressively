import { Card, CardContent } from "~/components/Card";
import { Strategy } from "../types";
import { Form, useNavigation } from "@remix-run/react";
import { useId } from "react";
import { StrategyFormFields } from "./StrategyFormFields/StrategyFormFields";
import { Variant } from "~/modules/variants/types";
import { Segment } from "~/modules/segments/types";
import { IconButton } from "~/components/Buttons/IconButton";
import { RuleList } from "./StrategyFormFields/RuleList";
import { PiTrashThin } from "react-icons/pi";
import { GoPlus } from "react-icons/go";
import { VscSave } from "react-icons/vsc";
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
    <div className="flex flex-col gap-8">
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

export interface StrategyItemProps {
  strategy: Strategy;
  variants: Array<Variant>;
  segments: Array<Segment>;
  index: number;
}

const StrategyItem = ({
  strategy,
  variants,
  segments,
  index,
}: StrategyItemProps) => {
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

      <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg">
        <div className="flex flex-row gap-4 justify-between items-center pb-2">
          <Typography as="h2" className="text-sm text-slate-600">
            Strategy #{index}
          </Typography>
          {/* <IconButton
            form={updateStrategyFormId}
            loadingText="Saving the strategy..."
            isLoading={isEditingStrategy}
            type="submit"
            icon={<VscSave className="text-xl text-purple-900" />}
            tooltip="Save strategy"
          /> */}

          <IconButton
            form={deleteStrategyFormId}
            type="submit"
            isLoading={isDeletingStrategy}
            loadingText="Deleting a strategy..."
            icon={<PiTrashThin className="text-xl" />}
            tooltip="Delete strategy"
          />
        </div>

        <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 ">
          <Typography
            as="span"
            className="pt-7 font-mono text-sm font-semibold"
          >
            Serve
          </Typography>

          <Card>
            <CardContent>
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
            </CardContent>
          </Card>

          {strategy.rules?.length > 0 && (
            <>
              <Typography
                as="span"
                className="pt-7 font-mono text-sm font-semibold"
              >
                When
              </Typography>
              <Card>
                <CardContent>
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
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        <div className="flex justify-center items-center pt-2">
          <IconButton
            type="submit"
            isLoading={isCreatingRule}
            loadingText="Adding a rule..."
            form={addStrategyRuleFormId}
            size="L"
            icon={
              <GoPlus className="text-xl p-1 w-8 h-8 block bg-slate-200 hover:bg-slate-300 active:bg-slate-400 rounded-full" />
            }
            tooltip="Add a rule"
          />
        </div>
      </div>
    </div>
  );
};
