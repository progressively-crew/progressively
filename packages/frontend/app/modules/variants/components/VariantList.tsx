import { Form } from "@remix-run/react";
import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { RawTable } from "~/components/RawTable";
import { Variant } from "../types";

export interface VariantListProps {
  variants: Array<Variant>;
}
export const VariantList = ({ variants }: VariantListProps) => {
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
              <Form method="post">
                <input type="hidden" name="_type" value="delete-variant" />
                <input type="hidden" name="variantId" value={variant.uuid} />

                <DeleteButton small type="submit">
                  Remove
                </DeleteButton>
              </Form>
            </td>
          </tr>
        ))}
      </tbody>
    </RawTable>
  );
};
