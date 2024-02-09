export interface Funnel {
  uuid: string;
  name: string;
  createdAt: Date;
  projectUuid: string;
}

export interface FunnelChart {
  funnel: Funnel;
  funnelStats: Array<{
    event: string;
    count: number;
  }>;
}
