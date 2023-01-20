import { Form } from "@remix-run/react";
import { useId, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { KeyboardKeys } from "~/modules/a11y/utils/keyboardKeys";

export interface TagInputProps {
  defaultValue?: Array<string>;
}

export const TagInput = ({ defaultValue }: TagInputProps) => {
  const [tags, setTags] = useState<Array<string>>(defaultValue || []);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const nextChip = formData.get("tag-name")?.toString() || "";
    const isAlreadySet = tags.includes(nextChip);

    if (!isAlreadySet) {
      setTags((s) => [...s, nextChip]);
      const input = (e.target as any)["tag-name"] as HTMLInputElement;
      e.currentTarget.reset();
      input.focus();
    }
  };

  const removeTag = (tag: string) => {
    setTags((s) => s.filter((t) => t !== tag));
  };

  return (
    <>
      <Form onSubmit={handleSubmit} className="w-full">
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
            type="text"
            name="tag-name"
            aria-label="Add a new tag to the list"
            className="bg-white dark:bg-transparent"
            onKeyDown={(e) => {
              if (
                e.key === KeyboardKeys.BACKSPACE &&
                (e.target as HTMLInputElement).value === "" &&
                tags.length > 0
              ) {
                removeTag(tags[tags.length - 1]);
              }
            }}
          />
        </div>
      </Form>

      <input type="hidden" name="field-value" value={tags.join("\n")} />
    </>
  );
};
