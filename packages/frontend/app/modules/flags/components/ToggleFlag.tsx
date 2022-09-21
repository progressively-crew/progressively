import { Form, useTransition } from "@remix-run/react";
import { Switch } from "~/components/Switch";
import { FlagStatus } from "../types";

export interface ToggleFlag {
  isFlagActivated: boolean;
}

export const ToggleFlag = ({ isFlagActivated }: ToggleFlag) => {
  const transition = useTransition();

  const formDataInProgress = transition.submission?.formData;

  const optimisticActivated =
    formDataInProgress?.get("_type") === "toggle-flag"
      ? formDataInProgress.get("nextStatus") === FlagStatus.ACTIVATED
      : isFlagActivated;

  return (
    <Form method="post">
      <input type="hidden" name="_type" value="toggle-flag" />
      <input
        type="hidden"
        name="nextStatus"
        value={
          isFlagActivated ? FlagStatus.NOT_ACTIVATED : FlagStatus.ACTIVATED
        }
      />

      <Switch
        label="Feature flag status"
        type="submit"
        checked={optimisticActivated}
        onLabel={"Activated"}
        offLabel={"Not activated"}
      />
    </Form>
  );
};
