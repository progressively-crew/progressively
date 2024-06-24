import { IoMdClose } from "react-icons/io";
import { IconButton } from "~/components/Buttons/IconButton";
import { Card, CardContent } from "~/components/Card";
import { Typography } from "~/components/Typography";
import { Variant } from "~/modules/variants/types";
import { Strategy } from "../../types";
import { RuleList } from "../StrategyFormFields/RuleList";
import { StrategyFormFields } from "../StrategyFormFields/StrategyFormFields";
import { useDeleteStrategy } from "./useDeleteStrategy";
import { useState } from "react";
import { Rule } from "~/modules/rules/types";
import { createEmptyRule } from "~/modules/rules/services/createEmptyRule";

export interface StrategyItemProps {
  strategy: Strategy;
  variants: Array<Variant>;
  index: number;
}

export const StrategyItem = ({
  strategy,
  variants,
  index,
}: StrategyItemProps) => {
  const [ruleList, setRuleList] = useState<Array<Rule>>(strategy.rules || []);
  const { isDeletingStrategy, deleteStrategyFormId } =
    useDeleteStrategy(strategy);

  const formVariants = variants.map((variant) => {
    const rolloutPercentage =
      strategy.variants?.find((sv) => sv.variantUuid === variant.uuid)
        ?.rolloutPercentage || 0;

    return {
      ...variant,
      rolloutPercentage,
    };
  });

  const addRule = () => {
    setRuleList((s) => [...s, createEmptyRule()]);
  };

  const removeRule = (rule: Rule) => {
    setRuleList((s) => s.filter((r) => r.uuid !== rule.uuid));
  };

  return (
    <div>
      <div className="bg-gray-100 p-4 rounded-xl">
        <div className="flex flex-row gap-4 justify-between items-center pb-4">
          <Typography as="h2" className="font-semibold">
            Strategy #{index}
          </Typography>

          <IconButton
            form={deleteStrategyFormId}
            type="submit"
            isLoading={isDeletingStrategy}
            loadingText="Deleting a strategy..."
            icon={<IoMdClose className="text-xl" />}
            tooltip="Delete strategy"
          />
        </div>

        <div className="grid md:grid-cols-[auto_1fr] gap-x-4 gap-y-4">
          <Typography
            as="span"
            className="pt-7 font-mono text-sm font-semibold"
          >
            Serve
          </Typography>

          <Card>
            <CardContent>
              <StrategyFormFields
                valueToServeType={strategy.valueToServeType}
                variants={formVariants}
                whenPredicate={strategy.whenPredicate}
                whenTimestamp={strategy.whenTimestamp}
                rolloutPercentage={strategy.rolloutPercentage || 0}
                index={index}
              />
            </CardContent>
          </Card>

          <>
            {ruleList.length > 0 ? (
              <Typography
                as="span"
                className="pt-7 font-mono text-sm font-semibold"
              >
                If
              </Typography>
            ) : (
              <div />
            )}

            <Card>
              <CardContent>
                <RuleList
                  rules={ruleList}
                  onRemoveRule={removeRule}
                  index={index}
                  onAddRule={addRule}
                />
              </CardContent>
            </Card>
          </>
        </div>
      </div>
    </div>
  );
};
