export interface AvatarProps {
  children: string;
}

export const Avatar = ({ children }: AvatarProps) => {
  const firstLetter = children[0];

  return (
    <div
      className="rounded-full uppercase flex items-center bg-indigo-600 h-10 w-10 justify-center text-white"
      aria-hidden
    >
      {firstLetter}
    </div>
  );
};
