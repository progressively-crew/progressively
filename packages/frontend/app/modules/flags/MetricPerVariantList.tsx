import { RawTable, Tr, Th, Td } from "~/components/RawTable";
import { Typography } from "~/components/Typography";

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
    <RawTable>
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
            <Td>{mHit.variant}</Td>
            <Td>{mHit.count}</Td>
            <Td>{mHit.variantCount}</Td>
            <Td>
              {mHit.variantCount
                ? `${((mHit.count / mHit.variantCount) * 100).toFixed(2)}%`
                : null}
            </Td>
          </Tr>
        ))}
      </tbody>
    </RawTable>
  );
};
