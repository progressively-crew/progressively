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
          className="h-10 rounded pl-4 pr-12 border border-gray-200 flex-1"
        />

        <button
          type="submit"
          aria-label="Search"
          className="right-1 absolute w-8 h-8 rounded bg-gray-100 text-gray-700 hover:bg-gray-50 flex items-center justify-center"
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
