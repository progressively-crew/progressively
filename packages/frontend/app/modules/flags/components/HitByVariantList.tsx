import { RawTable } from "~/components/RawTable";
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
}

export const HitByVariantList = ({ hits }: HitByVariantListProps) => {
  return (
    <RawTable>
      <thead>
        <tr>
          <th>Metric</th>
          <th>Variant</th>
          <th>Metric hit</th>
          <th>Variant evalutations</th>
          <th>Ratio</th>
        </tr>
      </thead>
      <tbody>
        {hits.map((hit) => (
          <tr key={hit.metric}>
            <td>{hit.metric}</td>
            <td>{hit.variant}</td>
            <td>
              <Typography as="span" fontWeight="bold" fontSize="uranus">
                {hit.count}
              </Typography>
            </td>
            <td>
              <Typography
                as="span"
                fontWeight="bold"
                color="nemesis"
                fontSize="uranus"
              >
                {hit.variantEvalutations}
              </Typography>
            </td>
            <td>
              <Tag color="successFg" background="successBg">
                {hit.variantEvalutations > 0
                  ? `${Math.round(
                      (hit.count / hit.variantEvalutations) * 100
                    )}%`
                  : "N/A"}
              </Tag>
            </td>
          </tr>
        ))}
      </tbody>
    </RawTable>
  );
};
