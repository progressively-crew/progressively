import { MenuButton } from "~/components/MenuButton";
import { Variant } from "../types";
import { VariantDot } from "./VariantDot";
import { ButtonCopy } from "~/components/ButtonCopy";
import { Table, Tbody, Th, Tr, Td } from "~/components/Table";
import { BsCheck } from "react-icons/bs/index.js";

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
    <Table>
      <caption className="sr-only">List of available variants</caption>
      <thead>
        <tr>
          <Th>
            <span className="sr-only">Variant icon</span>
          </Th>

          <Th>Variant value</Th>
          <Th>Is control</Th>
          <Th>Actions</Th>
        </tr>
      </thead>
      <Tbody>
        {variants.map((variant) => (
          <Tr key={variant.uuid}>
            <Td style={{ width: 40 }}>
              <VariantDot variant={variant.value} />
            </Td>

            <Td>
              <ButtonCopy size="S" toCopy={variant.value}>
                {variant.value}
              </ButtonCopy>
            </Td>

            <Td style={{ width: 120 }}>
              {variant.isControl && (
                <div className="flex justify-center w-full">
                  <BsCheck
                    className="text-3xl text-emerald-400"
                    aria-label={`The variant "${variant.value}" is the control.`}
                  />
                </div>
              )}
            </Td>
            <Td style={{ width: 100 }}>
              <div className="flex justify-center w-full">
                <MenuButton
                  items={[
                    {
                      label: "Attach a metric",
                      href: `/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/metrics/create?variant=${variant.uuid}`,
                    },
                    {
                      label: "Remove",
                      href: `/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/variants/${variant.uuid}/delete`,
                    },
                  ]}
                  label={"Actions on variant"}
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
