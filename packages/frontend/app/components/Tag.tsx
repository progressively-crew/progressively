export interface TagProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  size?: "S" | "M";
  className?: string;
  variant?: "PRIMARY" | "DEFAULT" | "SUCCESS";
}

const sizeStyle = {
  S: "px-2 py-1",
  M: "px-4 py-2",
};

const variants = {
  DEFAULT: "bg-gray-100 rounded-full",
  PRIMARY: "bg-indigo-100 text-indigo-700 rounded-full",
  SUCCESS: "bg-green-100 text-green-700 rounded-full",
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
