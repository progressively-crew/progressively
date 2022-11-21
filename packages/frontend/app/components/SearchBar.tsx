import { Form } from "@remix-run/react";
import { IoIosSearch } from "react-icons/io";
import { VisuallyHidden } from "./VisuallyHidden";

export interface SearchBarProps {
  placeholder: string;
  label: string;
}

export const SearchBar = ({ placeholder, label }: SearchBarProps) => {
  return (
    <div>
      <VisuallyHidden>
        <label htmlFor="search">{label}</label>
      </VisuallyHidden>

      <Form>
        <div className="flex flex-row items-center h-10 rounded px-4 border border-gray-200 gap-2 bg-white overflow-hidden w-full">
          <IoIosSearch className="text-xl text-gray-500" />

          <input
            type="text"
            name="search"
            id="search"
            placeholder={placeholder}
            className="flex-1"
          />

          <VisuallyHidden>
            <button type="submit">Search</button>
          </VisuallyHidden>
        </div>
      </Form>
    </div>
  );
};
