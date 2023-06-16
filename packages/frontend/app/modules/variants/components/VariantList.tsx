import { CardEntity } from "~/components/Entity/Entity";
import { MenuButton } from "~/components/MenuButton";
import { Variant } from "../types";
import { VariantDot } from "./VariantDot";

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
    <ul className="flex flex-col gap-4">
      {variants.map((variant) => (
        <li key={variant.uuid}>
          <CardEntity
            title={variant.value}
            avatar={<VariantDot variant={variant.value} />}
            menu={
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
                label={"Actions on webhook"}
                variant="action"
              />
            }
          />
        </li>
      ))}
    </ul>
  );
};
