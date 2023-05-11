import { LoaderFunction, V2_MetaFunction } from "@remix-run/node";
import { Plan } from "~/modules/plans/types";
import { getSession } from "~/sessions";
import { getBillingInfo } from "~/modules/plans/services/getBillingInfo";
import { BackLink } from "~/components/BackLink";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { CreateEntityTitle } from "~/layouts/CreateEntityTitle";
import { CreateEntityLayout } from "~/layouts/CreateEntityLayout";
import { Typography } from "~/components/Typography";
import { useSearchParams } from "@remix-run/react";
import { calculatePrice } from "@progressively/shared";

export const meta: V2_MetaFunction = () => {
  return [
    {
      title: "Progressively | Profile | Billing | Upgrade",
    },
  ];
};

interface LoaderData {
  plans: Array<Plan>;
  activePlan?: Plan;
  remainingTrialingDays: number;
}

export const loader: LoaderFunction = async ({
  request,
}): Promise<LoaderData> => {
  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");

  const billingInfo: LoaderData = await getBillingInfo(authCookie);

  return billingInfo;
};

export default function UpgradeBillingPage() {
  const [searchParams] = useSearchParams();

  const projectCount = searchParams.get("projectCount");
  const envCount = searchParams.get("envCount");
  const evalCount = searchParams.get("evalCount");

  if (!projectCount || !envCount || !evalCount) {
    return (
      <Typography>
        One of the mandatory information is missing. Please, retry the action.
      </Typography>
    );
  }

  const castedProjectCount = Number(projectCount);
  const castedEnvCount = Number(envCount);
  const castedEvalCount = Number(evalCount);

  if (
    Number.isNaN(castedProjectCount) ||
    Number.isNaN(castedEnvCount) ||
    Number.isNaN(castedEvalCount)
  ) {
    return (
      <Typography>
        One of the information is not of a valid formatting. Please, try the
        action.
      </Typography>
    );
  }

  const total = calculatePrice(
    Number(projectCount),
    Number(envCount),
    Number(evalCount)
  );

  return (
    <CreateEntityLayout
      titleSlot={<CreateEntityTitle>Plan update</CreateEntityTitle>}
      submitSlot={
        <SubmitButton
          type="submit"
          isLoading={false}
          loadingText="Creating the metric, please wait..."
        >
          Update
        </SubmitButton>
      }
      backLinkSlot={
        <BackLink to={`/dashboard/profile/billing`}>Back to billing</BackLink>
      }
    >
      <Typography>
        You are about to modify your plan to the following:
      </Typography>

      <ul className="list-disc px-4 py-4">
        <li>
          <strong>{projectCount}</strong> projects
        </li>
        <li>
          <strong>{envCount}</strong> environments per project
        </li>
        <li>
          <strong>{evalCount}</strong> flag evaluations
        </li>
      </ul>

      <Typography>
        For a total of <strong>€{total}</strong> per month.
      </Typography>
    </CreateEntityLayout>
  );
}
