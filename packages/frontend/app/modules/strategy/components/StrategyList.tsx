import { Card, CardContent } from "~/components/Card";
import { Strategy, StrategyVariant } from "../types";
import { Form } from "@remix-run/react";
import { useId, useRef } from "react";
import { RuleFormField } from "~/modules/rules/components/RuleFormField";
import { StrategyFormFields } from "./StrategyFormFields";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { Tag } from "~/components/Tag";
import { CreateButton } from "~/components/Buttons/CreateButton";
import { MenuButton } from "~/components/MenuButton";
import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { Variant } from "~/modules/variants/types";

export interface StrategyListProps {
  items: Array<Strategy>;
  variants: Array<Variant>;
}

export const StrategyList = ({ items, variants }: StrategyListProps) => {
  return (
    <div className="flex flex-col gap-4">
      {items.map((strategy) => {
        return (
          <StrategyItem
            key={strategy.uuid}
            strategy={strategy}
            variants={variants}
          />
        );
      })}
    </div>
  );
};

export interface StrategyItemProps {
  strategy: Strategy;
  variants: Array<Variant>;
}

const getVariantPercentage = (
  variant: Variant,
  variants: Array<StrategyVariant> | undefined
) => ({
  ...variant,
  rolloutPercentage:
    variants?.find((sv) => sv.variantUuid === variant.uuid)
      ?.rolloutPercentage || 0,
});

const StrategyItem = ({ strategy, variants }: StrategyItemProps) => {
  const deleteStrategyForm = useRef<HTMLFormElement>(null);

  const id = useId();
  const updateStrategyFormId = `update-strategy-${id}`;
  const deleteStrategyRule = `delete-strategy-rule-${id}`;

  return (
    <Card
      footer={
        <div className="flex flex-row gap-4 justify-between">
          <div className="flex flex-row gap-4">
            <SubmitButton form={updateStrategyFormId}>Save</SubmitButton>

            <Form method="post">
              <input type="hidden" value="add-strategy-rule" name="_type" />
              <input type="hidden" value={strategy.uuid} name="uuid" />

              <CreateButton type="submit" variant="secondary">
                Add a rule
              </CreateButton>
            </Form>
          </div>

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
              variants={variants.map((variant) =>
                getVariantPercentage(variant, strategy.variants)
              )}
              rolloutPercentage={strategy.rolloutPercentage || 0}
            />

            <MenuButton
              items={[
                {
                  label: "Delete strategy",
                  onClick: () => {
                    deleteStrategyForm.current?.submit();
                  },
                },
              ]}
              label={"Actions on strategy"}
            />
          </div>
        </CardContent>

        <div
          className={`flex flex-col gap-1 ${
            strategy.rules?.length ? "mb-1" : ""
          }`}
        >
          {strategy.rules?.map((rule, index) => (
            <div key={rule.uuid}>
              <div className="bg-gray-50 dark:bg-slate-900 px-6 py-4 pl-20">
                <input type="hidden" value={rule.uuid} name="ruleUuid" />
                <div className="flex flex-row gap-4 justify-between">
                  <div className="flex-1">
                    <RuleFormField
                      initialFieldName={rule.fieldName}
                      initialFieldComparator={rule.fieldComparator}
                      initialFieldValue={rule.fieldValue}
                    />
                  </div>

                  <DeleteButton
                    type="submit"
                    value={rule.uuid}
                    form={deleteStrategyRule}
                    name="ruleId"
                    className="rounded"
                    variant="tertiary"
                  >
                    Remove
                  </DeleteButton>
                </div>
              </div>

              {index !== strategy.rules!.length - 1 && (
                <span className="-mt-2 absolute -ml-6">
                  <Tag variant="PRIMARY">OR</Tag>
                </span>
              )}
            </div>
          ))}
        </div>
      </Form>
    </Card>
  );
};
