import { GoPlus } from "react-icons/go";
import { PiTrashThin } from "react-icons/pi";
import { IconButton } from "~/components/Buttons/IconButton";
import { Card, CardContent } from "~/components/Card";
import { Typography } from "~/components/Typography";
import { Segment } from "~/modules/segments/types";
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
  segments: Array<Segment>;
  index: number;
}

export const StrategyItem = ({
  strategy,
  variants,
  segments,
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
      <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg">
        <div className="flex flex-row gap-4 justify-between items-center pb-2">
          <Typography as="h2" className="text-sm text-slate-600">
            Strategy #{index}
          </Typography>

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
              <StrategyFormFields
                valueToServe={strategy.valueToServe}
                valueToServeType={strategy.valueToServeType}
                variants={formVariants}
                rolloutPercentage={strategy.rolloutPercentage || 0}
              />
            </CardContent>
          </Card>

          {ruleList.length > 0 && (
            <>
              <Typography
                as="span"
                className="pt-7 font-mono text-sm font-semibold"
              >
                When
              </Typography>
              <Card>
                <CardContent>
                  <RuleList
                    rules={ruleList}
                    segments={segments}
                    onRemoveRule={removeRule}
                  />
                </CardContent>
              </Card>
            </>
          )}
        </div>

        <div className="flex justify-center items-center pt-2">
          <IconButton
            type="button"
            size="L"
            icon={
              <GoPlus className="text-xl p-1 w-8 h-8 block bg-slate-200 hover:bg-slate-300 active:bg-slate-400 rounded-full" />
            }
            tooltip="Add a rule"
            onClick={addRule}
          />
        </div>
      </div>
    </div>
  );
};
