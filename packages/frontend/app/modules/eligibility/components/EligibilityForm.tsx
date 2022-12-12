import { useState } from "react";
import { FaEquals } from "react-icons/fa";
import { TbBox } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";
import { Button } from "~/components/Buttons/Button";
import { FormGroup } from "~/components/Fields/FormGroup";
import { SelectField } from "~/components/Fields/SelectField";
import { TextInput } from "~/components/Fields/TextInput";
import { HStack } from "~/components/HStack";
import { Spacer } from "~/components/Spacer";
import { Tag } from "~/components/Tag";
import { ComparatorEnum } from "~/modules/strategies/types";
import { EligibilityCreateDTO } from "../types";

export interface EligibilityFormProps {
  errors: Record<string, string>;
  initialFieldName?: EligibilityCreateDTO["fieldName"];
  initialFieldValue?: EligibilityCreateDTO["fieldValue"];
  initialFieldComparator?: EligibilityCreateDTO["fieldComparator"];
}

export const EligibilityForm = ({
  errors,
  initialFieldName,
  initialFieldValue,
  initialFieldComparator,
}: EligibilityFormProps) => {
  const [chips, setChips] = useState<Array<string>>([]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const nextChip = formData.get("field-value-parent")?.toString() || "";
    const isAlreadySet = chips.includes(nextChip);

    if (!isAlreadySet) {
      setChips((s) => [...s, nextChip]);
      const input = (e.target as any)["field-value-parent"] as HTMLInputElement;
      e.currentTarget.reset();
      input.focus();
    }
  };

  const handleRemoval = (idx: number) => {
    setChips((s) => s.filter((_, index: number) => idx !== index));

    const input = document.querySelector(`[name="field-value-parent"]`) as
      | HTMLInputElement
      | undefined;

    input?.focus();
  };

  return (
    <FormGroup>
      <HStack spacing={4}>
        <TextInput
          isInvalid={Boolean(errors["field-name"])}
          label="Field name"
          placeholder="e.g: email"
          defaultValue={initialFieldName}
          name="field-name"
          form="eligibility-form"
        />

        <SelectField
          isInvalid={Boolean(errors["field-comparator"])}
          name="field-comparator"
          label="Field comparator"
          defaultValue={initialFieldComparator}
          options={[
            {
              value: ComparatorEnum.Equals,
              label: "Equals",
              icon: <FaEquals />,
            },
            {
              value: ComparatorEnum.Contains,
              label: "Contains",
              icon: <TbBox />,
            },
          ]}
          form="eligibility-form"
        />
      </HStack>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-row gap-4 items-end">
          <div className="flex-1">
            <TextInput
              isInvalid={Boolean(errors["field-value"])}
              label="Values matching the previous field"
              name="field-value-parent"
              defaultValue={initialFieldValue}
              placeholder="e.g: marvin.frachet@something.com"
            />
          </div>
          <Button type="submit" variant="secondary">
            Add value
          </Button>
        </div>

        {chips.length > 0 && <Spacer size={4} />}

        <ul className="flex flex-row gap-2 flex-wrap">
          {chips.map((chip, index: number) => (
            <li key={index}>
              <Tag className="text-sm flex flex-row gap-2">
                <span>{chip}</span>
                <button
                  aria-label={`Remove ${chip}`}
                  type="button"
                  name="delete"
                  onClick={() => handleRemoval(index)}
                >
                  <IoMdClose />
                </button>
              </Tag>
              <input
                type="hidden"
                name="field-value"
                value={chip}
                form="eligibility-form"
              />
            </li>
          ))}
        </ul>
      </form>
    </FormGroup>
  );
};
