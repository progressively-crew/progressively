import { SelectField } from "~/components/Fields/Select/SelectField";
import { WhenPredicate } from "../types";
import { useState } from "react";
import { TextInput } from "~/components/Fields/TextInput";

export interface WhenFieldProps {
  whenPredicateName: string;
  whenDateName: string;
}
export const WhenField = ({
  whenPredicateName,
  whenDateName,
}: WhenFieldProps) => {
  const [value, setValue] = useState(WhenPredicate.Always);

  const options = [
    { label: "always", value: WhenPredicate.Always },
    { label: "after the", value: WhenPredicate.AfterThe },
    { label: "before the", value: WhenPredicate.BeforeThe },
  ];

  return (
    <div className="flex flex-row gap-4">
      <SelectField
        hiddenLabel
        label="What value to you want to serve?"
        name={whenPredicateName}
        value={value}
        options={options}
        onValueChange={(str) => setValue(str as WhenPredicate)}
      />

      {value !== WhenPredicate.Always && (
        <TextInput
          type="datetime-local"
          hiddenLabel
          label="Date of the strategy constraint"
          defaultValue={new Date().toString()}
          name={whenDateName}
        />
      )}
    </div>
  );
};
