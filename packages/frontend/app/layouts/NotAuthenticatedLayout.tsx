import { Card, CardContent } from "~/components/Card";
import { Container } from "~/components/Container";
import { Logo } from "~/components/Logo/Logo";
import { Main } from "~/components/Main";
import { Spacer } from "~/components/Spacer";
import { Stack } from "~/components/Stack";

export interface NotAuthenticatedLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  status?: React.ReactNode;
  size?: "S" | "M";
  action?: React.ReactNode;
}

export const NotAuthenticatedLayout = ({
  children,
  header,
  status,
  size,
  action,
}: NotAuthenticatedLayoutProps) => {
  const containerSize = size === "S" ? "md:max-w-[480px]" : "md:w-2/5";
  return (
    <div className="h-full flex-1 bg-gray-50 dark:bg-slate-900">
      <nav
        aria-label="Breadcrumbs"
        className="border-b border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800"
      >
        <Container>
          <ol className="flex h-14 items-center justify-between">
            <li>
              <div className={"rounded px-4 py-1"}>
                <Logo aria-label={"Progressively"} />
              </div>
            </li>
            {action && <li>{action}</li>}
          </ol>
        </Container>
      </nav>

      <div className={"w-full px-4 lg:px-8 mx-auto " + containerSize}>
        <Spacer size={8} />

        <Main>
          {status && (
            <div className="pb-4">
              <Stack spacing={4}>{status}</Stack>
            </div>
          )}

          <Card>
            <div className="py-12 px-8">
              <Stack spacing={4}>
                <Stack spacing={2}>{header}</Stack>
                {children}
              </Stack>
            </div>
          </Card>
        </Main>
      </div>

      <Spacer size={10} />
    </div>
  );
};
