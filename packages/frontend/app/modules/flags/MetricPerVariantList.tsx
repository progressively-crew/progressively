import { RawTable, Tr, Th, Td } from "~/components/RawTable";
import { Tag } from "~/components/Tag";
import { VariantDot } from "./components/VariantDot";

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
    <RawTable caption="Metrics per variant list">
      <thead>
        <Tr>
          <Th>Metric</Th>
          <Th>Variant (optional)</Th>
          <Th>Hits</Th>
          <Th>Variant eval.</Th>
          <Th>Ratio (hit/variant eval.)</Th>
        </Tr>
      </thead>
      <tbody>
        {items.map((mHit) => (
          <Tr key={mHit.metric}>
            <Td>{mHit.metric}</Td>
            <Td>
              {mHit.variant && (
                <span className="flex flex-row gap-3 items-center">
                  <VariantDot variant={mHit.variant} />
                  {mHit.variant}
                </span>
              )}
            </Td>
            <Td>
              <strong>{mHit.count}</strong>
            </Td>
            <Td>
              <strong>{mHit.variantCount}</strong>
            </Td>
            <Td>
              {mHit.variantCount ? (
                <Tag variant="SUCCESS">{`${(
                  (mHit.count / mHit.variantCount) *
                  100
                ).toFixed(2)}%`}</Tag>
              ) : null}
            </Td>
          </Tr>
        ))}
      </tbody>
    </RawTable>
  );
};
