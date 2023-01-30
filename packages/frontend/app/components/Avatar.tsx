import { stringToColor } from "~/modules/misc/utils/stringToColor";

export interface AvatarProps {
  children: string;
  size?: "M" | "S";
}

const Sizes = {
  M: "h-8 w-8",
  S: "h-6 w-6 text-xs",
};

export const Avatar = ({ children, size = "M" }: AvatarProps) => {
  const firstLetter = children[0];
  const sizeClass = Sizes[size];

  const background = stringToColor(children.toLowerCase(), 25);

  return (
    <div
      className={`rounded-full uppercase flex items-center justify-center text-white ${sizeClass}`}
      aria-hidden
      style={{ background }}
    >
      {firstLetter}
    </div>
  );
};
