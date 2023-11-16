export interface SearchLayoutProps {
  children: React.ReactNode;
  actions?: React.ReactNode;
}

export const SearchLayout = ({ children, actions }: SearchLayoutProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 md:w-[600px]">
      <div className="flex-1">{children}</div>
      {actions}
    </div>
  );
};
