import { ExperimentStatus } from './experiment.status';

export const strToExperimentStatus = (
  strStatus: string,
): ExperimentStatus | undefined => {
  let status: ExperimentStatus;

  if (strStatus === ExperimentStatus.ACTIVATED) {
    status = ExperimentStatus.ACTIVATED;
  } else if (strStatus === ExperimentStatus.INACTIVE) {
    status = ExperimentStatus.INACTIVE;
  } else if (strStatus === ExperimentStatus.NOT_ACTIVATED) {
    status = ExperimentStatus.NOT_ACTIVATED;
  }

  return status;
};
