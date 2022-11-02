export interface TagProps {
  children: React.ReactNode;
  size?: "S" | "M";
  className?: string;
}

const sizeStyle = {
  S: "px-2 py-1",
  M: "px-4 py-2",
};

export const Tag = ({ children, size, className = "" }: TagProps) => {
  const sharedClasses = "bg-gray-100 rounded-full";
  const sizesClasses = sizeStyle[size || "M"];

  return (
    <span className={sharedClasses + " " + sizesClasses + " " + className}>
      {children}
    </span>
  );
};
