export interface SearchLayoutProps {
  children: React.ReactNode;
  actions: React.ReactNode;
}

export const SearchLayout = ({ children, actions }: SearchLayoutProps) => {
  return (
    <div className="flex flex-row gap-4">
      <div className="flex-1">{children}</div>
      {actions}
    </div>
  );
};
