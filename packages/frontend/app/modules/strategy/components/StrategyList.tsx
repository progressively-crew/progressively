import { Card, CardContent } from "~/components/Card";
import { Strategy } from "../types";
import { MenuButton } from "~/components/MenuButton";
import { Form } from "@remix-run/react";
import { useRef } from "react";
import { RuleFormField } from "~/modules/rules/components/RuleFormField";
import { FormSliderInput } from "~/modules/flags/components/FormSliderInput";
import { ValueToServeFormField } from "./ValueToServeFormField";
import { Separator } from "~/components/Separator";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { Typography } from "~/components/Typography";
import { DashedButton } from "~/components/Buttons/DashedButton";

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

  const updateStrategyFormId = "update-strategy";

  return (
    <Card
      footer={
        <div className="flex flex-row gap-4">
          <SubmitButton form={updateStrategyFormId}>
            Update strategy
          </SubmitButton>

          <Form method="post" ref={formRef}>
            <input type="hidden" value="delete-strategy" name="_type" />
            <input type="hidden" value={strategy.uuid} name="uuid" />
            <DeleteButton variant="secondary">Delete strategy</DeleteButton>
          </Form>
        </div>
      }
    >
      <Form method="post" className="block" id={updateStrategyFormId}>
        <CardContent>
          <div className="flex flex-row gap-4 items-center">
            <ValueToServeFormField />

            <Typography>to</Typography>

            <FormSliderInput
              name={`rolloutPercentage`}
              label={`Rollout percentage`}
              initialPercentage={strategy.rolloutPercentage || 0}
            />

            <Typography>of the audience</Typography>
          </div>
        </CardContent>

        <Separator className="border-dashed" />

        {strategy.rules?.map((rule) => (
          <div
            className="bg-gray-50 dark:bg-slate-900 px-6 py-4 px-6"
            key={rule.uuid}
          >
            <RuleFormField
              initialFieldName={rule.fieldName}
              initialFieldComparator={rule.fieldComparator}
              initialFieldValue={rule.fieldValue}
            />
          </div>
        ))}
      </Form>

      <div className="px-6 py-4">
        <Form method="post">
          <input type="hidden" value="add-strategy-rule" name="_type" />
          <input type="hidden" value={strategy.uuid} name="uuid" />

          <DashedButton type="submit" size="S">
            Add a rule
          </DashedButton>
        </Form>
      </div>
    </Card>
  );
};
