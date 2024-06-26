import { Switch } from "~/components/Switch/Switch";
import { FlagStatus } from "../types";

export interface ToggleFlag {
  isFlagActivated: boolean;
  flagId: string;
}

export const ToggleFlag = ({ flagId, isFlagActivated }: ToggleFlag) => {
  const formId = `form-${flagId}`;

  return (
    <div>
      <input type="hidden" name="flagId" value={flagId} form={formId} />
      <input type="hidden" name="_type" value="toggle-flag" form={formId} />
      <input
        type="hidden"
        name="nextStatus"
        form={formId}
        value={
          isFlagActivated ? FlagStatus.NOT_ACTIVATED : FlagStatus.ACTIVATED
        }
      />

      <Switch
        form={formId}
        label="Flag status"
        checked={isFlagActivated}
        onClick={() => (window as any)?.track("toggle-flag")}
      />
    </div>
  );
};
