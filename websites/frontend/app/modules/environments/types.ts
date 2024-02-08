export interface LocalCount {
  count: number;
  name: string;
}

export interface Funnel {
  uuid: string;
  name: string;
}

export interface CreateFunnelEntryDTO {
  flagUuid?: string;
  flagName?: string;
  eventName?: string;
  variant?: string;
  pageViewUrl?: string;
}
