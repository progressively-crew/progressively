import { Form } from "@remix-run/react";
import { Switch } from "~/components/Switch";
import { FlagStatus } from "../types";

export interface ToggleFlag {
  isFlagActivated: boolean;
}

export const ToggleFlag = ({ isFlagActivated }: ToggleFlag) => {
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
        label="Feature flag status"
        type="submit"
        checked={isFlagActivated}
        onLabel={"Activated"}
        offLabel={"Not activated"}
      />
    </Form>
  );
};
