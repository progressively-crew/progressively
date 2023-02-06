import { Main } from "~/components/Main";
import { Spacer } from "~/components/Spacer";
import { Stack } from "~/components/Stack";

export interface NotAuthenticatedLayoutProps {
  children: React.ReactNode;
  nav?: React.ReactNode;
  header?: React.ReactNode;
  status?: React.ReactNode;
  size?: "S" | "M";
}

export const NotAuthenticatedLayout = ({
  children,
  nav,
  header,
  status,
  size,
}: NotAuthenticatedLayoutProps) => {
  const containerSize = size === "S" ? "md:max-w-[480px]" : "md:w-2/5";
  return (
    <div className="h-full flex-1 lg:bg-gray-50 lg:dark:bg-slate-900">
      <div className={"w-full px-4 lg:px-8 mx-auto " + containerSize}>
        <Spacer size={8} />

        <Main>
          {nav && <div className="inline-block">{nav}</div>}
          <Stack spacing={4}>
            <Stack spacing={2}>
              {header}
              {status && <Stack spacing={4}>{status}</Stack>}
            </Stack>
            {children}
          </Stack>
        </Main>
      </div>

      <Spacer size={10} />
    </div>
  );
};
