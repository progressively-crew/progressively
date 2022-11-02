export interface TagProps {
  children: React.ReactNode;
}

export const Tag = ({ children }: TagProps) => {
  return <span className="px-4 py-2 bg-gray-100 rounded">{children}</span>;
};
