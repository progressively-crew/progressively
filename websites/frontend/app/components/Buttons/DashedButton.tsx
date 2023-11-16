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
      className={`${sizeClass} text-center text-slate-600 border border-dashed border-slate-300 block rounded w-full hover:border-slate-200 hover:text-slate-400 active:border-slate-100 active:text-slate-300 flex flex-row items-center justify-center gap-4`}
      aria-disabled={isLoading}
      aria-label={isLoading ? loadingText : undefined}
    >
      {isLoading && <Spinner />}
      {children}
    </button>
  );
};
