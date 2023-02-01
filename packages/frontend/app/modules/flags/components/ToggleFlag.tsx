import { Switch } from "~/components/Switch/Switch";
import { FlagStatus } from "../types";

export interface ToggleFlag {
  isFlagActivated: boolean;
  flagId: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const ToggleFlag = ({
  flagId,
  isFlagActivated,
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
        label="Flag status"
        checked={isFlagActivated}
        onClick={onClick}
      />
    </div>
  );
};
