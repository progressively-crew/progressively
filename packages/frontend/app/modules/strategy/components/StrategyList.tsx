import { Card, CardContent } from "~/components/Card";
import { Strategy } from "../types";
import { Form } from "@remix-run/react";
import { useId, useRef } from "react";
import { RuleFormField } from "~/modules/rules/components/RuleFormField";
import { FormSliderInput } from "~/modules/flags/components/FormSliderInput";
import { ValueToServeFormField } from "./ValueToServeFormField";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { Typography } from "~/components/Typography";
import { DashedButton } from "~/components/Buttons/DashedButton";
import { Tag } from "~/components/Tag";
import { CreateButton } from "~/components/Buttons/CreateButton";

export interface StrategyListProps {
  items: Array<Strategy>;
}

export const StrategyList = ({ items }: StrategyListProps) => {
  return (
    <div className="flex flex-col gap-4">
      {items.map((strategy) => {
        return <StrategyItem key={strategy.uuid} strategy={strategy} />;
      })}
    </div>
  );
};

export interface StrategyItemProps {
  strategy: Strategy;
}
const StrategyItem = ({ strategy }: StrategyItemProps) => {
  const formRef = useRef<HTMLFormElement>(null);

  const updateStrategyFormId = useId();

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

          <Form method="post" ref={formRef}>
            <input type="hidden" value="delete-strategy" name="_type" />
            <input type="hidden" value={strategy.uuid} name="uuid" />
            <DeleteButton variant="secondary">Delete</DeleteButton>
          </Form>
        </div>
      }
    >
      <Form method="post" className="block" id={updateStrategyFormId}>
        <input type="hidden" value="edit-strategy" name="_type" />
        <input type="hidden" value={strategy.uuid} name="uuid" />
        <CardContent>
          <div className="flex flex-row gap-4 items-center">
            <ValueToServeFormField
              valueToServe={strategy.valueToServe}
              valueToServeType={strategy.valueToServeType}
            />

            <Typography className="text-sm font-semibold">to</Typography>

            <FormSliderInput
              name={`rolloutPercentage`}
              label={`Rollout percentage`}
              initialPercentage={strategy.rolloutPercentage || 0}
            />

            <Typography className="text-sm font-semibold">
              of the audience
            </Typography>
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
                <RuleFormField
                  initialFieldName={rule.fieldName}
                  initialFieldComparator={rule.fieldComparator}
                  initialFieldValue={rule.fieldValue}
                />
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
