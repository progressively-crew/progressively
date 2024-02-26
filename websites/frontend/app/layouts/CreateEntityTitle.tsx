export interface CreateEntityTitleProps {
  children: React.ReactNode;
}
export const CreateEntityTitle = ({ children }: CreateEntityTitleProps) => {
  return (
    <h1 className="text-xl md:text-3xl font-semibold font-title">{children}</h1>
  );
};
