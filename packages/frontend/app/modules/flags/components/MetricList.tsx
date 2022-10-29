import { Link } from "@remix-run/react";
import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { RawTable } from "~/components/RawTable";
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
        <tr>
          <th>Name</th>
          <th>Attached variant (optional)</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {metrics.map((metric) => (
          <tr key={metric.uuid}>
            <td>
              <div>{metric.name}</div>
            </td>

            <td>
              <Link
                to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/variants`}
              >
                {metric.variant?.value}
              </Link>
            </td>

            <td>
              <DeleteButton
                small
                variant="tertiary"
                to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/metrics/${metric.uuid}/delete`}
              >
                Remove
              </DeleteButton>
            </td>
          </tr>
        ))}
      </tbody>
    </RawTable>
  );
};
