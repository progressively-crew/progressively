import { Entity } from "~/components/Entity/Entity";
import { EntityField } from "~/components/Entity/EntityField";
import { VariantDot } from "../variants/components/VariantDot";

interface MetricHit {
  metric: string;
  variant: string;
  count: number;
  variantCount?: number;
}

export interface MetricPerVariantListProps {
  items: Array<MetricHit>;
}

export const MetricPerVariantList = ({ items }: MetricPerVariantListProps) => {
  return (
    <div>
      {items.map((mHit) => {
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
              name="Variant eval."
              value={
                <strong>{mHit.variant ? mHit.variantCount || 0 : "N/A"}</strong>
              }
            />

            <EntityField
              name="Ratio (metric/eval)"
              value={
                <strong>
                  {mHit.variantCount
                    ? `${((mHit.count / mHit.variantCount) * 100).toFixed(2)}%`
                    : "N/A"}
                </strong>
              }
            />
          </Entity>
        );
      })}
    </div>
  );
};
