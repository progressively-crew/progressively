import { Entity } from "~/components/Entity/Entity";
import { EntityField } from "~/components/Entity/EntityField";
import { VariantDot } from "../variants/components/VariantDot";
import { SelectField } from "~/components/Fields/Select/SelectField";
import { useState } from "react";
import { MetricCard } from "../insights/components/MetricCard";

interface MetricHit {
  metric: string;
  variant: string;
  count: number;
  variantCount?: number;
}

interface VariantEntityProps {
  mHit: MetricHit;
  allMetrics: Array<MetricHit>;
}

const VariantEntity = ({ mHit, allMetrics }: VariantEntityProps) => {
  const [selected, setSelected] = useState("variant");
  const compareWithOptions = [];

  if (mHit.variant) {
    compareWithOptions.push({
      value: "variant",
      label: "Associated variant",
    });
  }

  for (const m of allMetrics) {
    if (m.metric !== mHit.metric) {
      compareWithOptions.push({
        value: m.metric,
        label: m.metric,
      });
    }
  }

  let ratio = "N/A";

  if (selected === "variant") {
    ratio = mHit.variantCount
      ? `${((mHit.count / mHit.variantCount) * 100).toFixed(2)}%`
      : "N/A";
  } else if (selected) {
    const otherMetric = allMetrics.find((m) => m.metric === selected)!;
    ratio = `${((mHit.count / otherMetric.count) * 100).toFixed(2)}%`;
  }

  return (
    <MetricCard
      metric={mHit.metric}
      hit={mHit.count}
      variant={mHit.variant}
      ratio={ratio}
    >
      <SelectField
        name="compare-with"
        label="Compare with"
        defaultValue={"variant"}
        options={compareWithOptions}
        onValueChange={(x) => setSelected(x)}
      />
    </MetricCard>
  );

  return (
    <Entity
      key={mHit.metric}
      title={mHit.metric}
      description={
        mHit.variant ? (
          <div className="flex flex-row gap-2 items-center">
            <VariantDot variant={mHit.variant} />
            <p>
              Attached to variant <strong>{mHit.variant}</strong>
            </p>
          </div>
        ) : (
          "No variant attached"
        )
      }
    >
      <EntityField name="Hits" value={<strong>{mHit.count}</strong>} />
      <EntityField
        name={"Compare with"}
        value={
          <SelectField
            hiddenLabel
            name="compare-with"
            label="Compare with other metric or variant entity"
            defaultValue={"variant"}
            options={compareWithOptions}
            onValueChange={(x) => setSelected(x)}
          />
        }
      />

      <EntityField
        name={`Ratio (hits/${
          selected === "variant" ? "variant evals" : `${selected} hits`
        })`}
        value={<strong>{ratio}</strong>}
      />
    </Entity>
  );
};

export interface MetricPerVariantListProps {
  items: Array<MetricHit>;
}

export const MetricPerVariantList = ({ items }: MetricPerVariantListProps) => {
  return (
    <div className="flex flex-row gap-4 pt-4">
      {items.map((mHit) => {
        return (
          <VariantEntity key={mHit.metric} mHit={mHit} allMetrics={items} />
        );
      })}
    </div>
  );
};
