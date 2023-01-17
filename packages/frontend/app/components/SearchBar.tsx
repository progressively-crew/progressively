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

      <Form role="search">
        <div className="flex flex-row items-center h-10 rounded pl-4 border border-gray-200 gap-2 bg-white overflow-hidden w-full dark:border-slate-700 dark:bg-slate-800 pr-1">
          <input
            type="text"
            name="search"
            id="search"
            placeholder={placeholder}
            className="flex-1 dark:text-slate-100 dark:bg-slate-800"
          />

          <button
            type="submit"
            aria-label="Search"
            className="w-8 h-8 rounded bg-indigo-100 text-indigo-700 text-indigo-700 hover:bg-indigo-50 active:bg-indigo-100 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600 dark:active:bg-slate-500 flex items-center justify-center"
          >
            <AiOutlineSearch />
          </button>
        </div>
      </Form>

      {count === undefined ? null : <Spacer size={1} />}

      <Typography aria-live="polite" aria-atomic="true" aria-relevant="all">
        {count === undefined ? null : `${count} results for this search`}
      </Typography>
    </div>
  );
};
