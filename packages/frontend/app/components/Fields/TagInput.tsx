import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { KeyboardKeys } from "~/modules/a11y/utils/keyboardKeys";

export interface TagInputProps {
  defaultValue?: Array<string>;
}

export const TagInput = ({ defaultValue }: TagInputProps) => {
  const [value, setValue] = useState("");
  const [tags, setTags] = useState<Array<string>>(defaultValue || []);

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (
      e.key === KeyboardKeys.BACKSPACE &&
      (e.target as HTMLInputElement).value === "" &&
      tags.length > 0
    ) {
      removeTag(tags[tags.length - 1]);
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

  const inputWrapperClasses =
    "rounded w-full focus-within:outline-none focus-within:ring-2 focus-within:ring-slate-400 focus-within:ring-offset-2 dark:focus-within:ring-offset-slate-900";

  return (
    <div className={inputWrapperClasses}>
      <div className="min-h-10 rounded px-2 py-2 border border-gray-200 dark:border-slate-800 dark:text-slate-100 dark:bg-slate-700 flex flex-wrap gap-2 bg-white w-full text-gray-600 dark:text-slate-100">
        {tags.length > 0 && (
          <ul className="flex flex-row flex-wrap items-center gap-2 h-full items-center">
            {tags.map((tag) => (
              <li key={tag}>
                <button
                  aria-label="Remove"
                  className="bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 hover:bg-gray-200 active:bg-gray-300 dark:hover:bg-slate-700 dark:active:bg-slate-600 text-xs rounded p-1 h-full flex items-center justify-between"
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
          className="bg-white dark:bg-transparent outline-none"
          onKeyDown={handleKeyDown}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>

      <input type="hidden" name="field-value" value={tags.join("\n")} />
    </div>
  );
};
