export interface CreateEntityTitleProps {
  children: React.ReactNode;
}
export const CreateEntityTitle = ({ children }: CreateEntityTitleProps) => {
  return (
    <h1 className="text-3xl font-semibold dark:text-slate-100">{children}</h1>
  );
};
