import {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
  redirect,
} from "@remix-run/node";
import { Plan } from "~/modules/plans/types";
import { getSession } from "~/sessions";
import { getBillingInfo } from "~/modules/plans/services/getBillingInfo";
import { BackLink } from "~/components/BackLink";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { CreateEntityTitle } from "~/layouts/CreateEntityTitle";
import { CreateEntityLayout } from "~/layouts/CreateEntityLayout";
import { Typography } from "~/components/Typography";
import { Form, useActionData, useSearchParams } from "@remix-run/react";
import { EvaluationToPriceId, Prices } from "@progressively/shared";
import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { checkout } from "~/modules/billing/services/checkout";

export const meta: MetaFunction = () => {
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

export interface ActionData {
  updated?: boolean;
  errors?: {
    backend?: string;
  };
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const session = await getSession(request.headers.get("Cookie"));
  const accessToken = session.get("auth-cookie");

  const evalCount = formData.get("evalCount");

  try {
    const priceId = evalCount
      ? EvaluationToPriceId[Number(evalCount.toString())]
      : undefined;

    if (priceId) {
      const { sessionUrl, updated } = await checkout(priceId, accessToken);

      if (sessionUrl) {
        return redirect(sessionUrl);
      }

      if (updated) {
        return redirect(
          "/dashboard/profile/billing?subscriptionUpdated=true#subscription-updated"
        );
      }
    }

    return {
      errors: {
        backend: "Something went wrong when trying to add the plan.",
      },
    };
    // await addPlan(Number(evalCount), accessToken);
  } catch (error: any) {
    return {
      errors: {
        backend: error.message,
      },
    };
  }
};

export default function UpgradeBillingPage() {
  const [searchParams] = useSearchParams();
  const data = useActionData<ActionData>();

  const evalCount = searchParams.get("evalCount");

  if (!evalCount) {
    return (
      <main>
        <Typography as="h1">
          One of the mandatory information is missing. Please, retry the action.
        </Typography>
      </main>
    );
  }

  const castedEvalCount = Number(evalCount);

  if (Number.isNaN(castedEvalCount)) {
    return (
      <main>
        <Typography as="h1">
          One of the information is not of a valid formatting. Please, try the
          action.
        </Typography>
      </main>
    );
  }

  const actualPlan = Prices.find((price) => price.events === castedEvalCount);
  if (!actualPlan) {
    return (
      <main>
        <Typography as="h1">
          No plan exists with the amount you've tried to set.
        </Typography>
      </main>
    );
  }

  return (
    <CreateEntityLayout
      titleSlot={<CreateEntityTitle>Plan update</CreateEntityTitle>}
      status={data?.errors ? <ErrorBox list={data?.errors} /> : null}
      submitSlot={
        <Form method="post" replace>
          <input type="hidden" name="evalCount" value={evalCount} />
          <SubmitButton
            type="submit"
            isLoading={false}
            loadingText="Creating the metric, please wait..."
          >
            Update
          </SubmitButton>
        </Form>
      }
      backLinkSlot={
        <BackLink to={`/dashboard/profile/billing`}>Back to billing</BackLink>
      }
    >
      <Typography>
        You are about to modify your plan to the following:
      </Typography>

      <ul className="list-disc px-4 py-4 dark:text-white">
        <li>
          <strong>{actualPlan.events}</strong> flag evaluations
        </li>
      </ul>

      <Typography>
        For a total of <strong>{actualPlan.price}</strong> per month. This
        amount is billed immediately when you validate the update.
      </Typography>
    </CreateEntityLayout>
  );
}
