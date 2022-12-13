import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { Link } from "~/components/Link";
import { RawTable, Td, Th, Tr } from "~/components/RawTable";
import { Tag } from "~/components/Tag";
import { stringToColor } from "~/modules/misc/utils/stringToColor";
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
                  className="no-underline"
                >
                  {metric.variant?.value && (
                    <Tag
                      style={{
                        background: stringToColor(metric.variant.value, 90),
                        color: stringToColor(metric.variant.value, 25),
                      }}
                    >
                      {metric.variant.value}
                    </Tag>
                  )}
                </Link>
              )}
            </Td>

            <Td>
              <div className="inline-block">
                <DeleteButton
                  variant="secondary"
                  to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/metrics/${metric.uuid}/delete`}
                >
                  Remove
                </DeleteButton>
              </div>
            </Td>
          </Tr>
        ))}
      </tbody>
    </RawTable>
  );
};
