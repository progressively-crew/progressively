export interface TagProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  size?: "XS" | "S" | "M";
  className?: string;
  variant?: "PRIMARY" | "DEFAULT" | "SUCCESS" | "DANGER";
}

const sizeStyle = {
  XS: "px-2 py-1 text-xs",
  S: "px-2 py-1",
  M: "px-4 py-2",
};

const variants = {
  DEFAULT:
    "bg-gray-100 text-gray-600 dark:bg-slate-900 dark:text-slate-100 rounded-full",
  PRIMARY: "bg-slate-800 text-white rounded-full",
  SUCCESS: "bg-emerald-100 text-emerald-700 rounded-full",
  DANGER: "bg-red-100 text-red-700 rounded-full",
};

export const Tag = ({
  children,
  size,
  className = "",
  variant,
  ...props
}: TagProps) => {
  const sharedClasses = variants[variant || "DEFAULT"];
  const sizesClasses = sizeStyle[size || "M"];

  return (
    <span
      className={className + " " + sharedClasses + " " + sizesClasses}
      {...props}
    >
      {children}
    </span>
  );
};
