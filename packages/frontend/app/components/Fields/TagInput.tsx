import { useRef, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { KeyboardKeys } from "~/modules/a11y/utils/keyboardKeys";

export interface TagInputProps {
  defaultValue?: Array<string>;
}

export const TagInput = ({ defaultValue }: TagInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
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
      const input = inputRef.current;
      if (!input) return;

      if (!tags.includes(input.value)) {
        setTags((s) => [...s, input.value]);

        input.value = "";
        input.focus();
      }
    }
  };

  const removeTag = (tag: string) => {
    setTags((s) => s.filter((t) => t !== tag));
  };

  return (
    <div className="w-full">
      <div className="min-h-10 rounded px-2 py-2 border border-gray-200 dark:border-slate-800 dark:text-slate-100 dark:bg-slate-700 flex flex-wrap gap-2 bg-white w-full text-gray-600 dark:text-slate-100">
        {tags.length > 0 && (
          <ul className="flex flex-row flex-wrap items-center gap-2 h-full items-center">
            {tags.map((tag) => (
              <li key={tag}>
                <button
                  aria-label="Remove"
                  className="bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 text-xs rounded  p-1 h-full flex items-center justify-between"
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
          ref={inputRef}
          type="text"
          name="tag-name"
          aria-label="Add a new tag to the list"
          className="bg-white dark:bg-transparent"
          onKeyDown={handleKeyDown}
        />
      </div>

      <input type="hidden" name="field-value" value={tags.join("\n")} />
    </div>
  );
};
