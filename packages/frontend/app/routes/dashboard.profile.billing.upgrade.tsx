import {
  ActionFunction,
  LoaderFunction,
  V2_MetaFunction,
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
import { calculatePrice } from "@progressively/shared";
import { addPlan } from "~/modules/plans/services/addPlan";
import { ErrorBox } from "~/components/Boxes/ErrorBox";

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

export interface ActionData {
  errors?: {
    backend?: string;
  };
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const session = await getSession(request.headers.get("Cookie"));
  const accessToken = session.get("auth-cookie");

  const projectCount = formData.get("projectCount");
  const envCount = formData.get("envCount");
  const evalCount = formData.get("evalCount");

  try {
    await addPlan(
      Number(projectCount),
      Number(envCount),
      Number(evalCount),
      accessToken
    );

    return redirect("/dashboard/profile/billing?planCreated=true");
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
      status={data?.errors ? <ErrorBox list={data?.errors} /> : null}
      submitSlot={
        <Form method="post">
          <input type="hidden" name="projectCount" value={projectCount} />
          <input type="hidden" name="envCount" value={envCount} />
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
        For a total of <strong>€{total}</strong> per month. This amount is
        billed immediately when you validate the update.
      </Typography>
    </CreateEntityLayout>
  );
}
