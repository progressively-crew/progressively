import { Form } from "@remix-run/react";
import { IoIosSearch } from "react-icons/io";
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
    <div className="max-w-md">
      <VisuallyHidden>
        <label htmlFor="search">{label}</label>
      </VisuallyHidden>

      <Form role="search">
        <div className="flex flex-row items-center h-10 rounded pl-4 border border-gray-200 gap-2 bg-white overflow-hidden w-full">
          <IoIosSearch className="text-xl text-gray-500" />

          <input
            type="text"
            name="search"
            id="search"
            placeholder={placeholder}
            className="flex-1"
          />

          <button
            type="submit"
            className="bg-indigo-100 text-indigo-700 text-indigo-700 hover:bg-indigo-50 active:bg-indigo-100 h-full px-4"
          >
            Search
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
