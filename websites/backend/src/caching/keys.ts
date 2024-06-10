import { Timeframe } from '../events/types';

export const projectEpochKey = (projectId: string) =>
  `project:${projectId}:epoch`;

export const sdkB64EpochToEntryKey = (b64: string, epoch: string) =>
  `sdk:${b64}:epoch:${epoch}`;

export const projectIdFunnelsKey = (projectId: string, timeframe: Timeframe) =>
  `project:${projectId}:funnels:${timeframe}`;

export const projectIdTimeframeEvent = (
  projectId: string,
  timeframe: Timeframe,
  eventName: string,
  isInPast?: boolean,
) =>
  isInPast
    ? `project:${projectId}:analytics:${timeframe}:${eventName}:in-past`
    : `project:${projectId}:analytics:${timeframe}:${eventName}`;

export const projectIdTimeframeEventOverTime = (
  projectId: string,
  timeframe: Timeframe,
  eventName: string,
) => `project:${projectId}:analytics-over-time:${timeframe}:${eventName}:`;
