import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { RawTable } from "~/components/RawTable";
import { Variant } from "../types";

export interface VariantListProps {
  variants: Array<Variant>;
  projectId: string;
  envId: string;
  flagId: string;
}
export const VariantList = ({
  variants,
  projectId,
  envId,
  flagId,
}: VariantListProps) => {
  return (
    <RawTable>
      <thead>
        <tr>
          <th>Value</th>
          <th>Rollout percentage</th>
          <th>Is this the control</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {variants.map((variant) => (
          <tr key={`${variant.uuid}`}>
            <td>
              <div>{variant.value}</div>
            </td>

            <td>
              <div>{variant.rolloutPercentage}%</div>
            </td>
            <td>
              <div>{variant.isControl}</div>
            </td>
            <td>
              <DeleteButton
                small
                to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/variants/${variant.uuid}/delete`}
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
