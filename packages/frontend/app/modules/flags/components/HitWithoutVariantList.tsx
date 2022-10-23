import { RawTable } from "~/components/RawTable";
import { Typography } from "~/components/Typography";

interface MetricHit {
  count: number;
  metric: string;
}

export interface HitWithoutVariantListProps {
  hits: Array<MetricHit>;
}

export const HitWithoutVariantList = ({ hits }: HitWithoutVariantListProps) => {
  return (
    <RawTable>
      <thead>
        <tr>
          <th>Metric</th>
          <th>Metric hit</th>
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
          </tr>
        ))}
      </tbody>
    </RawTable>
  );
};
