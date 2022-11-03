import { HStack } from "~/components/HStack";
import { RawTable, Td, Th, Tr } from "~/components/RawTable";
import { Tag } from "~/components/Tag";
import { Typography } from "~/components/Typography";

interface VariantHit {
  count: number;
  metric: string;
  variant: string;
  variantEvalutations: number;
}

export interface HitByVariantListProps {
  hits: Array<VariantHit>;
  flagEvaluationsCount: number;
}

export const HitByVariantList = ({
  hits,
  flagEvaluationsCount,
}: HitByVariantListProps) => {
  return (
    <RawTable>
      <thead>
        <Tr>
          <Th>Metric</Th>
          <Th>Metric hit</Th>
          <Th>Variant</Th>
          <Th>Variant eval.</Th>
          <Th>Flag eval.</Th>
        </Tr>
      </thead>
      <tbody>
        {hits.map((hit) => (
          <Tr key={hit.metric}>
            <Td>{hit.metric}</Td>
            <Td>
              <Typography as="span">{hit.count}</Typography>
            </Td>
            <Td>{hit.variant}</Td>
            <Td>
              <HStack as="span" spacing={2}>
                <Typography as="span">{hit.variantEvalutations}</Typography>

                <Tag>
                  {hit.variantEvalutations > 0
                    ? `${Math.round(
                        (hit.count / hit.variantEvalutations) * 100
                      )}%`
                    : "N/A"}
                </Tag>
              </HStack>
            </Td>
            <Td>
              <HStack as="span" spacing={2}>
                <Typography as="span">{flagEvaluationsCount}</Typography>

                <Tag>
                  {flagEvaluationsCount > 0
                    ? `${Math.round((hit.count / flagEvaluationsCount) * 100)}%`
                    : "N/A"}
                </Tag>
              </HStack>
            </Td>
          </Tr>
        ))}
      </tbody>
    </RawTable>
  );
};
