import { ButtonCopy } from "~/components/ButtonCopy";
import { HideMobile } from "~/components/HideMobile";
import { ToggleExperiment } from "./ToggleExperiment";

export interface ExperimentHeaderActionProps {
  experimentKey: string;
  isExperimentActivated: boolean;
}

export const ExperimentHeaderAction = ({
  experimentKey,
  isExperimentActivated,
}: ExperimentHeaderActionProps) => {
  return (
    <>
      <ToggleExperiment isExperimentActivated={isExperimentActivated} />
      <HideMobile>
        <ButtonCopy toCopy={experimentKey}>{experimentKey}</ButtonCopy>
      </HideMobile>
    </>
  );
};
