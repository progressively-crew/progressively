import { LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { authGuard } from "~/modules/auth/services/auth-guard";
import { UserProvider } from "~/modules/user/contexts/UserProvider";
import { User } from "~/modules/user/types";

interface LoaderData {
  user: User;
}

export const loader: LoaderFunction = async ({
  request,
}): Promise<LoaderData> => {
  const user = await authGuard(request);

  return { user };
};

export default function DashboardLayout() {
  const { user } = useLoaderData<LoaderData>();

  return (
    <UserProvider user={user}>
      <Outlet />
    </UserProvider>
  );
}
