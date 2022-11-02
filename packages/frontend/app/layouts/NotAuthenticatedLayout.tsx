import { Main } from "~/components/Main";
import { Spacer } from "~/components/Spacer";
import { Stack } from "~/components/Stack";

export interface NotAuthenticatedLayoutProps {
  children: React.ReactNode;
  nav?: React.ReactNode;
  header?: React.ReactNode;
  status?: React.ReactNode;
}

export const NotAuthenticatedLayout = ({
  children,
  nav,
  header,
  status,
}: NotAuthenticatedLayoutProps) => {
  return (
    <div className="flex h-full">
      <div className="w-3/5">
        <Spacer size={12} />

        <Main>
          <div className="w-3/5 mx-auto">
            {nav && <div>{nav}</div>}
            <Stack spacing={4}>
              <Stack spacing={2}>
                {header}
                {status && <Stack spacing={4}>{status}</Stack>}
              </Stack>
              {children}
            </Stack>
          </div>
        </Main>
      </div>

      <div className="w-2/5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-full"></div>
    </div>
  );
};
