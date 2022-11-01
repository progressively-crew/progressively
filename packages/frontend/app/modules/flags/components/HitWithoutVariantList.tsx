import { HStack } from "~/components/HStack";
import { RawTable, Td, Th, Tr } from "~/components/RawTable";
import { Tag } from "~/components/Tag";
import { Typography } from "~/components/Typography";

interface MetricHit {
  count: number;
  metric: string;
}

export interface HitWithoutVariantListProps {
  hits: Array<MetricHit>;
  flagEvaluationsCount: number;
}

export const HitWithoutVariantList = ({
  hits,
  flagEvaluationsCount,
}: HitWithoutVariantListProps) => {
  return (
    <RawTable>
      <thead>
        <Tr>
          <Th>Metric</Th>
          <Th>Metric hit</Th>
          <Th>Flag eval.</Th>
        </Tr>
      </thead>
      <tbody>
        {hits.map((hit) => (
          <Tr key={hit.metric}>
            <Td>{hit.metric}</Td>
            <Td>
              <Typography as="span" fontWeight="bold" fontSize="uranus">
                {hit.count}
              </Typography>
            </Td>
            <Td>
              <HStack as="span" spacing={2}>
                <Typography
                  as="span"
                  fontWeight="bold"
                  color="nemesis"
                  fontSize="uranus"
                >
                  {flagEvaluationsCount}
                </Typography>

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
