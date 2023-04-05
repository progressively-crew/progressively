import { Card, CardContent } from "~/components/Card";
import { Strategy } from "../types";
import { MenuButton } from "~/components/MenuButton";
import { Form } from "@remix-run/react";
import { useRef } from "react";
import { RuleFormField } from "~/modules/rules/components/RuleFormField";
import { FormSliderInput } from "~/modules/flags/components/FormSliderInput";
import { ValueToServeFormField } from "./ValueToServeFormField";
import { Separator } from "~/components/Separator";

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

  return (
    <Card>
      <div className="flex-1">
        <Form method="post" className="block">
          <CardContent>
            <FormSliderInput
              name={`rolloutPercentage`}
              label={`Rollout percentage`}
              initialPercentage={strategy.rolloutPercentage || 0}
            />
          </CardContent>

          <Separator className="border-dashed" />

          <CardContent>
            <RuleFormField
              initialFieldName={""}
              initialFieldComparator={""}
              initialFieldValue={""}
            />

            <ValueToServeFormField />
          </CardContent>
        </Form>
      </div>

      <Form method="post" ref={formRef}>
        <input type="hidden" value="delete-strategy" name="_type" />
        <input type="hidden" value={strategy.uuid} name="uuid" />
        <MenuButton
          items={[
            {
              label: "Delete strategy",
              onClick: () => {
                formRef?.current?.submit();
              },
              noInitial: true,
            },
          ]}
          label={"Actions on strategy"}
          variant="action"
        />
      </Form>
    </Card>
  );
};
