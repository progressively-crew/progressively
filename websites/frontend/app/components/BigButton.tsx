import { ReactNode } from "react";

interface BigButtonProps {
  children: ReactNode;
  isLoading: boolean;
}

export const BigButton = ({ children, isLoading }: BigButtonProps) => {
  return (
    <button
      aria-busy={isLoading}
      type="submit"
      className="relative border border-dashed border-gray-300 w-full py-4 rounded-xl text-gray-600 hover:bg-gray-100 active:bg-gray-200"
    >
      {children}
    </button>
  );
};
