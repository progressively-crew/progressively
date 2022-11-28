import { Form } from "@remix-run/react";
import { IoIosSearch } from "react-icons/io";
import { VisuallyHidden } from "./VisuallyHidden";

export interface SearchBarProps {
  placeholder: string;
  label: string;
}

export const SearchBar = ({ placeholder, label }: SearchBarProps) => {
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
    </div>
  );
};
