import { Background } from "~/components/Background";
import { Intercom } from "~/modules/support/components/Intercom";

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
    <Background>
      <main className="h-full flex-1 flex flex-col items-center justify-center">
        <Intercom />

        {backLink && (
          <div className="p-4 absolute top-1 left-0">{backLink}</div>
        )}

        {status && <div className="pb-12 max-w-md w-full">{status}</div>}

        <div className="px-12 py-16 max-w-md w-full mx-auto flex items-center flex-col justify-center rounded-2xl bg-white shadow-xl">
          {children}
        </div>
      </main>
    </Background>
  );
};
