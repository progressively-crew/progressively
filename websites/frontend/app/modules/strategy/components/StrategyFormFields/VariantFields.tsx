import { Link } from "@remix-run/react";
import { IoMdClose } from "react-icons/io";
import { CreateButton } from "~/components/Buttons/CreateButton";
import { IconButton } from "~/components/Buttons/IconButton";
import { PercentageField } from "~/components/Fields/PercentageField";
import { useFlag } from "~/modules/flags/contexts/useFlag";
import { useProject } from "~/modules/projects/contexts/useProject";
import { Variant } from "~/modules/variants/types";

export interface VariantFieldsProps {
  variants: Array<Variant & { rolloutPercentage: number }>;
  index: number;
}

export const VariantFields = ({ variants, index }: VariantFieldsProps) => {
  const { flag } = useFlag();
  const { project } = useProject();

  return (
    <div className="flex flex-row gap-4 flex-wrap items-center">
      {variants.map((variant, variantIndex: number) => {
        return (
          <div key={variant.uuid} className="bg-slate-50 px-2 py-2 rounded">
            <input
              type="hidden"
              name={`strategies[${index}][variants][${variantIndex}][uuid]`}
              value={variant.uuid}
            />
            <div className="flex flex-row gap-2 items-center">
              <PercentageField
                name={`strategies[${index}][variants][${variantIndex}][variantRolloutPercentage]`}
                initialValue={variant.rolloutPercentage}
                label={variant.value}
              />

              <IconButton
                as={Link}
                to={`/dashboard/projects/${project.uuid}/flags/${flag.uuid}/audience/variants/${variant.uuid}/delete`}
                icon={<IoMdClose />}
                tooltip={`Remove ${variant.value}`}
              />
            </div>
          </div>
        );
      })}

      <CreateButton
        to={`/dashboard/projects/${project.uuid}/flags/${flag.uuid}/audience/variants/create`}
        variant="tertiary"
      >
        Add a variant
      </CreateButton>
    </div>
  );
};
