import { Form } from "@remix-run/react";
import { AiOutlineSearch } from "react-icons/ai";
import { Spacer } from "./Spacer";
import { Typography } from "./Typography";
import { VisuallyHidden } from "./VisuallyHidden";

export interface SearchBarProps {
  placeholder: string;
  label: string;
  count?: number;
}

export const SearchBar = ({ placeholder, label, count }: SearchBarProps) => {
  return (
    <div>
      <VisuallyHidden>
        <label htmlFor="search">{label}</label>
      </VisuallyHidden>

      <Form role="search" className="flex flex-row gap-4 items-center relative">
        <input
          type="text"
          name="search"
          id="search"
          placeholder={placeholder}
          className="h-10 rounded pl-4 pr-12 border border-gray-200 dark:border-slate-700 dark:bg-slate-800 flex-1 dark:text-slate-100 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
        />

        <button
          type="submit"
          aria-label="Search"
          className="right-1 absolute w-8 h-8 rounded bg-indigo-100 text-indigo-700 text-indigo-700 hover:bg-indigo-50 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600 dark:active:bg-slate-500 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
        >
          <AiOutlineSearch />
        </button>
      </Form>

      {count === undefined ? null : <Spacer size={1} />}

      <Typography aria-live="polite" aria-atomic="true" aria-relevant="all">
        {count === undefined ? null : `${count} results for this search`}
      </Typography>
    </div>
  );
};
