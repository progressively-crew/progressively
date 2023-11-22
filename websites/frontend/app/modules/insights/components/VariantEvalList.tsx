import { Table, Th, Tbody, Tr, Td } from "~/components/Table";
import { VariantDot } from "~/modules/variants/components/VariantDot";

export interface FlagEvaluation {
  valueResolved: string;
  _count: number;
}

export interface VariantEvalListProps {
  flagEvaluationsCount: number;
  flagEvaluations: Array<FlagEvaluation>;
}

export const VariantEvalList = ({
  flagEvaluations,
  flagEvaluationsCount,
}: VariantEvalListProps) => {
  return (
    <Table>
      <caption className="sr-only">
        Evaluation count per variant for the given flag
      </caption>
      <thead>
        <tr>
          <Th>Value</Th>
          <Th>Evaluation count</Th>
          <Th>Ratio</Th>
        </tr>
      </thead>

      <Tbody>
        {flagEvaluations.map((fe) => (
          <Tr key={`variant-card-${fe.valueResolved}`}>
            <Td>
              <div className="flex flex-row gap-2 items-center">
                <VariantDot variant={fe.valueResolved} />
                {fe.valueResolved}
              </div>
            </Td>
            <Td>{fe._count}</Td>
            <Td>
              <strong>
                {Math.round((fe._count / flagEvaluationsCount) * 10_000) / 100}%
              </strong>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
