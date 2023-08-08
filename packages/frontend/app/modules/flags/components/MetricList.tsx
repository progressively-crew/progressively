import { ButtonCopy } from "~/components/ButtonCopy";
import { MenuButton } from "~/components/MenuButton";
import { Metric } from "../types";
import { VariantDot } from "../../variants/components/VariantDot";
import { Table, Tbody, Th, Tr, Td } from "~/components/Table";

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
    <Table>
      <caption className="sr-only">List of metrics available</caption>
      <thead>
        <tr>
          <Th>Metric name</Th>
          <Th>Variant attached (optional)</Th>
          <Th>Actions</Th>
        </tr>
      </thead>
      <Tbody>
        {metrics.map((metric) => (
          <Tr key={metric.uuid}>
            <Td>
              <ButtonCopy size="S" toCopy={metric.name}>
                {metric.name}
              </ButtonCopy>
            </Td>
            <Td>
              {metric.variant && (
                <div className="flex flex-row gap-2 items-center">
                  <VariantDot variant={metric.variant.value} />

                  {metric.variant.value}
                </div>
              )}
            </Td>
            <Td style={{ width: 100 }}>
              <div className="flex justify-center w-full">
                <MenuButton
                  items={[
                    {
                      label: "Remove",
                      href: `/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/metrics/${metric.uuid}/delete`,
                    },
                  ]}
                  label={"Actions on metric"}
                  variant="action"
                />
              </div>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
