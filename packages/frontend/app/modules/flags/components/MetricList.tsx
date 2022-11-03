import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { Link } from "~/components/Link";
import { RawTable, Td, Th, Tr } from "~/components/RawTable";
import { Metric } from "../types";

export interface MetricListProps {
  metrics: Array<Metric>;
  projectId: string;
  envId: string;
  flagId: string;
}
export const MetricList = ({
  metrics,
  projectId,
  envId,
  flagId,
}: MetricListProps) => {
  return (
    <RawTable>
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>Attached variant (optional)</Th>
          <Th>Actions</Th>
        </Tr>
      </thead>
      <tbody>
        {metrics.map((metric) => (
          <Tr key={metric.uuid}>
            <Td>
              <div>{metric.name}</div>
            </Td>

            <Td>
              {metric.variant?.value && (
                <Link
                  to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/variants`}
                >
                  {metric.variant?.value}
                </Link>
              )}
            </Td>

            <Td>
              <DeleteButton
                variant="secondary"
                to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/metrics/${metric.uuid}/delete`}
              >
                Remove
              </DeleteButton>
            </Td>
          </Tr>
        ))}
      </tbody>
    </RawTable>
  );
};
