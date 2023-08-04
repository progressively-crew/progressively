export interface NotAuthenticatedLayoutProps {
  children: React.ReactNode;
  status?: React.ReactNode;
  aside: React.ReactNode;
  backLink?: React.ReactNode;
}

export const NotAuthenticatedLayout = ({
  children,
  status,
  aside,
  backLink,
}: NotAuthenticatedLayoutProps) => {
  return (
    <main className="h-full flex-1 grid grid-cols-2">
      <div className="h-full">
        {backLink && <div className="p-4 absolute">{backLink}</div>}
        <div className="px-12 max-w-md mx-auto flex items-center flex-col justify-center h-full">
          {status && <div className="pb-12">{status}</div>}

          {children}
        </div>
      </div>

      <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-fuchsia-900 h-full">
        {aside}
      </div>
    </main>
  );
};
