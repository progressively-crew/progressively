export interface AvatarProps {
  children: string;
}

export const Avatar = ({ children }: AvatarProps) => {
  const firstLetter = children[0];

  return <div aria-hidden>{firstLetter}</div>;
};
