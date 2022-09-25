import { Form } from "@remix-run/react";
import { Switch } from "~/components/Switch";
import { FlagStatus } from "../types";

export interface ToggleFlag {
  isFlagActivated: boolean;
  flagId: string;
}

export const ToggleFlag = ({ flagId, isFlagActivated }: ToggleFlag) => {
  return (
    <Form method="post">
      <input type="hidden" name="flagId" value={flagId} />
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
        checked={isFlagActivated}
      />
    </Form>
  );
};
