export interface DashedButtonProps {
  children: React.ReactNode;
  type?: "submit" | "button";
  size?: "S" | "M";
}

export const DashedButton = ({
  children,
  type = "button",
}: DashedButtonProps) => {
  const sizeClass = "py-2 text-sm";
  return (
    <button
      type={type}
      className={`${sizeClass} text-center text-slate-600 border border-dashed border-slate-300 block rounded w-full hover:border-slate-200 hover:text-slate-400 active:border-slate-100 active:text-slate-300`}
    >
      {children}
    </button>
  );
};
