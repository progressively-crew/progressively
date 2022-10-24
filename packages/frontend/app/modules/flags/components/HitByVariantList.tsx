import { HStack } from "~/components/HStack";
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
  flagEvaluationsCount: number;
}

export const HitByVariantList = ({
  hits,
  flagEvaluationsCount,
}: HitByVariantListProps) => {
  return (
    <RawTable>
      <thead>
        <tr>
          <th>Metric</th>
          <th>Metric hit</th>
          <th>Variant</th>
          <th>Variant eval.</th>
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
            <td>{hit.variant}</td>
            <td>
              <HStack as="span" spacing={2}>
                <Typography
                  as="span"
                  fontWeight="bold"
                  color="successFg"
                  fontSize="uranus"
                >
                  {hit.variantEvalutations}
                </Typography>

                <Tag color="successFg" background="successBg">
                  {hit.variantEvalutations > 0
                    ? `${Math.round(
                        (hit.count / hit.variantEvalutations) * 100
                      )}%`
                    : "N/A"}
                </Tag>
              </HStack>
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
