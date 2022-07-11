import { ButtonCopy } from "~/components/ButtonCopy";
import { HideMobile } from "~/components/HideMobile";
import { ToggleFlag } from "./ToggleFlag";

export interface FlagHeaderActionProps {
  flagKey: string;
  isFlagActivated: boolean;
}

export const FlagHeaderAction = ({
  flagKey,
  isFlagActivated,
}: FlagHeaderActionProps) => {
  return (
    <>
      <ToggleFlag isFlagActivated={isFlagActivated} />
      <HideMobile>
        <ButtonCopy toCopy={flagKey}>{flagKey}</ButtonCopy>
      </HideMobile>
    </>
  );
};
