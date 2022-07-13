import { ActionFunction } from "@remix-run/node";
import { Form, useTransition } from "@remix-run/react";
import { Switch } from "~/components/Switch";
import { getSession } from "~/sessions";
import { activateExperiment } from "../services/activateExperiment";
import { ExperimentStatus } from "../types";

export const toggleAction: ActionFunction = async ({
  request,
  params,
}): Promise<null> => {
  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");

  const formData = await request.formData();
  const nextStatus = formData.get("nextStatus");
  const experimentId = params.experimentId;

  if (nextStatus && experimentId) {
    await activateExperiment(
      params.env!,
      experimentId as string,
      nextStatus as ExperimentStatus,
      authCookie
    );
  }

  return null;
};

export interface ToggleExperimentProps {
  isExperimentActivated: boolean;
}

export const ToggleExperiment = ({
  isExperimentActivated,
}: ToggleExperimentProps) => {
  const transition = useTransition();

  return (
    <Form method="post">
      <input
        type="hidden"
        name="nextStatus"
        value={
          isExperimentActivated
            ? ExperimentStatus.NOT_ACTIVATED
            : ExperimentStatus.ACTIVATED
        }
      />

      <Switch
        label="Experiment status"
        optimistic={transition.state === "submitting"}
        type="submit"
        checked={isExperimentActivated}
      />
    </Form>
  );
};
