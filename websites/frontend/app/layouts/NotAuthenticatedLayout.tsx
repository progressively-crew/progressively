export interface NotAuthenticatedLayoutProps {
  children: React.ReactNode;
  status?: React.ReactNode;
  backLink?: React.ReactNode;
}

export const NotAuthenticatedLayout = ({
  children,
  status,
  backLink,
}: NotAuthenticatedLayoutProps) => {
  return (
    <main className="h-full flex-1 flex flex-col items-center justify-center">
      {backLink && <div className="p-4 absolute top-1 left-0">{backLink}</div>}

      {status && <div className="pb-12 max-w-md w-full">{status}</div>}

      <div className="px-12 py-16 max-w-md w-full mx-auto flex items-center flex-col justify-center sm:border-2 rounded-2xl border-slate-100">
        {children}
      </div>
    </main>
  );
};
