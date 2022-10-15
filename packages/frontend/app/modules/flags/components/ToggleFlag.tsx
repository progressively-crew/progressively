import { Switch } from "~/components/Switch";
import { FlagStatus } from "../types";

export interface ToggleFlag {
  isFlagActivated: boolean;
  flagId: string;
  flagName: string;
}

export const ToggleFlag = ({
  flagId,
  isFlagActivated,
  flagName,
}: ToggleFlag) => {
  return (
    <div>
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
        label={`Toggle ${flagName} flag status`}
        type="submit"
        checked={isFlagActivated}
      />
    </div>
  );
};
