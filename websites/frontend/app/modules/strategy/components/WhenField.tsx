import { SelectField } from "~/components/Fields/Select/SelectField";
import { WhenPredicate } from "../types";
import { useEffect, useRef, useState } from "react";
import { TextInput } from "~/components/Fields/TextInput";

export interface WhenFieldProps {
  whenPredicateName: string;
  whenDateName: string;
  initialWhenPredicate: WhenPredicate;
  initialWhenTimestamp?: string;
}
export const WhenField = ({
  whenPredicateName,
  whenDateName,
  initialWhenPredicate,
  initialWhenTimestamp,
}: WhenFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(
    initialWhenPredicate || WhenPredicate.Always
  );

  useEffect(() => {
    if (inputRef.current) {
      const date = initialWhenTimestamp
        ? new Date(initialWhenTimestamp)
        : new Date();

      const initialValue = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}T${String(
        date.getHours()
      ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;

      inputRef.current.value = initialValue;
    }
  }, [initialWhenTimestamp]);

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
          ref={inputRef}
          type="datetime-local"
          hiddenLabel
          label="Date of the strategy constraint"
          name={whenDateName}
        />
      )}
    </div>
  );
};
