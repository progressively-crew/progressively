import { Spinner } from "../Spinner";

export interface DashedButtonProps {
  children: React.ReactNode;
  type?: "submit" | "button";
  size?: "S" | "M";
  loadingText?: string;
  isLoading?: boolean;
  form?: string;
}

export const DashedButton = ({
  children,
  type = "button",
  loadingText,
  isLoading,
  form,
}: DashedButtonProps) => {
  const sizeClass = "py-2 text-sm";
  return (
    <button
      form={form}
      type={type}
      className={`${sizeClass} text-center text-gray-600 border border-dashed border-gray-300 block rounded w-full hover:border-gray-200 hover:text-gray-400 active:border-gray-100 active:text-gray-300 flex flex-row items-center justify-center gap-4`}
      aria-disabled={isLoading}
      aria-label={isLoading ? loadingText : undefined}
    >
      {isLoading && <Spinner />}
      {children}
    </button>
  );
};
