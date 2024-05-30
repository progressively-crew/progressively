import { Switch } from "~/components/Switch/Switch";
import { FlagStatus } from "../types";
import { useFlags } from "@progressively/react";

export interface ToggleFlag {
  isFlagActivated: boolean;
  flagId: string;
}

export const ToggleFlag = ({ flagId, isFlagActivated }: ToggleFlag) => {
  const formId = `form-${flagId}`;
  const { track } = useFlags();

  const nextStatus = isFlagActivated
    ? FlagStatus.NOT_ACTIVATED
    : FlagStatus.ACTIVATED;

  return (
    <div>
      <input type="hidden" name="flagId" value={flagId} form={formId} />
      <input type="hidden" name="_type" value="toggle-flag" form={formId} />
      <input type="hidden" name="nextStatus" form={formId} value={nextStatus} />

      <Switch
        form={formId}
        label="Flag status"
        checked={isFlagActivated}
        onClick={() => track("toggle-flag")}
      />
    </div>
  );
};
