export interface DeleteEntityTitleProps {
  children: React.ReactNode;
}
export const DeleteEntityTitle = ({ children }: DeleteEntityTitleProps) => {
  return (
    <h1 className="text-2xl font-semibold dark:text-slate-100" id="page-title">
      {children}
    </h1>
  );
};
