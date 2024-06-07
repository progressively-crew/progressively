export const projectEpochKey = (projectId: string) =>
  `project:${projectId}:epoch`;

export const sdkB64EpochToEntryKey = (b64: string, epoch: string) =>
  `sdk:${b64}:epoch:${epoch}`;
