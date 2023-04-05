export interface DashedButtonProps {
  children: React.ReactNode;
  type?: "submit" | "button";
  size?: "S" | "M";
}

const Sizes = {
  S: "py-1 text-sm",
  M: "py-3",
};

export const DashedButton = ({
  children,
  type = "button",
  size = "M",
}: DashedButtonProps) => {
  const sizeClass = Sizes[size];
  return (
    <button
      type={type}
      className={`${sizeClass} text-center text-slate-600 border border-dashed border-gray-500 block rounded w-full hover:border-gray-400 hover:text-gray-400 active:border-gray-300 active:text-gray-300`}
    >
      {children}
    </button>
  );
};
