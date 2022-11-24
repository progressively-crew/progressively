import { LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { StrategyProvider } from "~/modules/strategies/contexts/StrategyProvider";
import { getStrategy } from "~/modules/strategies/services/getStrategy";
import { AdditionalAudienceRetrieveDTO } from "~/modules/strategies/types";
import { getSession } from "~/sessions";

interface LoaderData {
  strategy: AdditionalAudienceRetrieveDTO;
}

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<LoaderData> => {
  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");

  const strategy: AdditionalAudienceRetrieveDTO = await getStrategy(
    params.stratId!,
    authCookie
  );

  return {
    strategy,
  };
};

export default function StratIdLayout() {
  const { strategy } = useLoaderData<LoaderData>();

  return (
    <StrategyProvider strategy={strategy}>
      <Outlet />
    </StrategyProvider>
  );
}
