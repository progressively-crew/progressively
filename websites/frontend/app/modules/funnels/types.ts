export interface Funnel {
  uuid: string;
  name: string;
  createdAt: Date;
  projectUuid: string;
}

export interface FunnelChart {
  uuid: string;
  name: string;
  funnelsEntries: Array<{
    name: string;
    count: number;
  }>;
}
