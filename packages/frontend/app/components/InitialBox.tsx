import { stringToColor } from "~/modules/misc/utils/stringToColor";

export interface InitialBoxProps {
  content: string;
  size?: "L" | "S";
}

const sizes = {
  L: "w-12 h-12 text-xl",
  S: "w-5 h-5 text-xs",
};

export const InitialBox = ({ content, size = "L" }: InitialBoxProps) => {
  const sizeClasses = sizes[size];

  return (
    <div
      className={`rounded flex items-center justify-center ${sizeClasses}`}
      aria-hidden
      style={{
        color: stringToColor(content, 25),
        background: stringToColor(content, 90),
      }}
    >
      {content[0]}
    </div>
  );
};
