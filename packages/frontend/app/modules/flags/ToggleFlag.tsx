import { ActionFunction, Form, useTransition } from "remix";
import { Switch } from "~/components/Switch";
import { getSession } from "~/sessions";
import { activateFlag } from "./activateFlag";
import { FlagStatus } from "./types";

export const toggleAction: ActionFunction = async ({
  request,
  params,
}): Promise<null> => {
  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");

  const formData = await request.formData();
  const nextStatus = formData.get("nextStatus");
  const flagId = params.flagId;

  if (nextStatus && flagId) {
    await activateFlag(
      params.id!,
      params.env!,
      flagId as string,
      nextStatus as FlagStatus,
      authCookie
    );
  }

  return null;
};

export interface ToggleFlag {
  isFlagActivated: boolean;
}

export const ToggleFlag = ({ isFlagActivated }: ToggleFlag) => {
  const transition = useTransition();

  return (
    <Form method="post">
      <input
        type="hidden"
        name="nextStatus"
        value={
          isFlagActivated ? FlagStatus.NOT_ACTIVATED : FlagStatus.ACTIVATED
        }
      />

      <Switch
        optimistic={transition.state === "submitting"}
        type="submit"
        checked={isFlagActivated}
      />
    </Form>
  );
};
