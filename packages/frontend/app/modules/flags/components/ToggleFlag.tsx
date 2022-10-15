import { Switch } from "~/components/Switch";
import { FlagStatus } from "../types";

export interface ToggleFlag {
  isFlagActivated: boolean;
  flagId: string;
  flagName: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const ToggleFlag = ({
  flagId,
  isFlagActivated,
  flagName,
  onClick,
}: ToggleFlag) => {
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
        label={`Toggle ${flagName} flag status`}
        type="submit"
        checked={isFlagActivated}
        onClick={onClick}
      />
    </div>
  );
};
