import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { KeyboardKeys } from "~/modules/a11y/utils/keyboardKeys";
import { Button } from "../Buttons/Button";

export interface TagInputProps {
  defaultValue?: Array<string>;
  name: string;
}

export const TagInput = ({ defaultValue, name }: TagInputProps) => {
  const [value, setValue] = useState("");
  const [tags, setTags] = useState<Array<string>>(defaultValue || []);

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (
      e.key === KeyboardKeys.BACKSPACE &&
      (e.target as HTMLInputElement).value === "" &&
      tags.length > 0
    ) {
      removeTag(tags.at(-1));
    }

    if (
      e.key === KeyboardKeys.ENTER &&
      (e.target as HTMLInputElement).value !== ""
    ) {
      e.preventDefault();

      if (!value) return;

      if (!tags.includes(value)) {
        setTags((s) => [...s, value]);
        setValue("");
      }
    }
  };

  const removeTag = (tag: string) => {
    setTags((s) => s.filter((t) => t !== tag));
  };

  const inputWrapperClasses = "rounded w-full";

  return (
    <div className={inputWrapperClasses}>
      <div className="min-h-10 rounded-xl px-1 py-1 border border-gray-200 flex flex-wrap gap-2 bg-white w-full text-gray-600">
        {tags.length > 0 && (
          <ul className="flex flex-row flex-wrap items-center gap-1 h-full items-center">
            {tags.map((tag) => (
              <li key={tag}>
                <button
                  aria-label="Remove"
                  className="bg-gray-100 text-gray-600 hover:bg-gray-200 active:bg-gray-300 text-xs rounded-lg px-1 h-8 flex items-center justify-between"
                  type="button"
                  onClick={() => removeTag(tag)}
                >
                  {tag} <IoCloseOutline aria-hidden className="ml-2" />
                </button>
              </li>
            ))}
          </ul>
        )}

        <input
          type="text"
          name="tag-name"
          aria-label="Add a new tag to the list"
          className="outline-none flex-1 text-xs"
          onKeyDown={handleKeyDown}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <Button
          className="!rounded-lg"
          variant="tertiary"
          size="S"
          onClick={() => {
            if (!value) return;

            if (!tags.includes(value)) {
              setTags((s) => [...s, value]);
              setValue("");
            }
          }}
        >
          Add value
        </Button>
      </div>

      <input type="hidden" name={name} value={tags.join("\n")} />
    </div>
  );
};
