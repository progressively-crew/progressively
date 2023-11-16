import { FlagStatus } from './flags.status';

export const strToFlagStatus = (strStatus: string): FlagStatus | undefined => {
  let status: FlagStatus;

  if (strStatus === FlagStatus.ACTIVATED) {
    status = FlagStatus.ACTIVATED;
  } else if (strStatus === FlagStatus.INACTIVE) {
    status = FlagStatus.INACTIVE;
  } else if (strStatus === FlagStatus.NOT_ACTIVATED) {
    status = FlagStatus.NOT_ACTIVATED;
  }

  return status;
};
