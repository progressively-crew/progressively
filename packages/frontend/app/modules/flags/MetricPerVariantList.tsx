import { RawTable, Tr, Th, Td } from "~/components/RawTable";
import { Tag } from "~/components/Tag";
import { stringToColor } from "../misc/utils/stringToColor";

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
                  <span
                    aria-hidden
                    style={{ background: stringToColor(mHit.variant, 75) }}
                    className="h-4 w-4 block rounded"
                  />
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
