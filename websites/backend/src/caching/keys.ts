import { Timeframe } from '../events/types';

// Analytics keys
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
) => `project:${projectId}:analytics-over-time:${timeframe}:${eventName}`;

export const flagEvaluationsKey = (flagId: string, timeframe: Timeframe) =>
  `flag:${flagId}:insights:${timeframe}`;

export const flagEvaluationsOverTimeKey = (
  flagId: string,
  timeframe: Timeframe,
) => `flag-over-time:${flagId}:insights:${timeframe}`;
// End of Analytics keys

// Payment related keys
export const projectCreditsKey = (projectUuid: string) =>
  `project:${projectUuid}:credits`;
// End of payment related keys

// Project optimization related keys
export const projectClientKeyToId = (clientKey: string) =>
  `project:clientKey:${clientKey}:id`;

export const projectSecretKeyToId = (secretKey: string) =>
  `project:clientKey:${secretKey}:id`;

export const projectByIdKey = (projectId: string) =>
  `project:${projectId}:data`;
// End of Project optimization related keys
