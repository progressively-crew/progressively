import { HStack } from "~/components/HStack";
import { RawTable } from "~/components/RawTable";
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
        <tr>
          <th>Metric</th>
          <th>Metric hit</th>
          <th>Flag eval.</th>
        </tr>
      </thead>
      <tbody>
        {hits.map((hit) => (
          <tr key={hit.metric}>
            <td>{hit.metric}</td>
            <td>
              <Typography as="span" fontWeight="bold" fontSize="uranus">
                {hit.count}
              </Typography>
            </td>
            <td>
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
            </td>
          </tr>
        ))}
      </tbody>
    </RawTable>
  );
};
