import { stringToColor } from "~/modules/misc/utils/stringToColor";

export interface IconBoxProps {
  children: React.ReactNode;
  content: string;
  size?: "L" | "S";
}

const sizes = {
  L: "w-8 h-8 text-xl",
  S: "w-5 h-5 text-xs",
};

export const IconBox = ({ children, content, size = "L" }: IconBoxProps) => {
  const sizeClasses = sizes[size];

  return (
    <div
      aria-hidden
      className={`rounded flex items-center justify-center ${sizeClasses}`}
      style={{
        color: stringToColor(content, 25),
        background: stringToColor(content, 90),
      }}
    >
      {children}
    </div>
  );
};
