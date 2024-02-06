export interface DeleteEntityTitleProps {
  children: React.ReactNode;
}
export const DeleteEntityTitle = ({ children }: DeleteEntityTitleProps) => {
  return <h1 className="text-2xl font-semibold font-title">{children}</h1>;
};
