import { RawTable, Tr, Th, Td } from "~/components/RawTable";
import { Tag } from "~/components/Tag";
import { Typography } from "~/components/Typography";
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
            <Td>
              {mHit.variant && (
                <Tag
                  style={{
                    background: stringToColor(mHit.variant, 90),
                  }}
                >
                  {mHit.variant}
                </Tag>
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
