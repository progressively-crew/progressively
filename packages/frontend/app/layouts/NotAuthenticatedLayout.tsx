import { Main } from "~/components/Main";
import { Spacer } from "~/components/Spacer";
import { Stack } from "~/components/Stack";
import boatSrc from "../images/boat.png";

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
    <div>
      <div className="w-full px-4 lg:px-8 md:w-2/5 mx-auto">
        <Spacer size={12} />

        <Main>
          {nav && <div>{nav}</div>}
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
