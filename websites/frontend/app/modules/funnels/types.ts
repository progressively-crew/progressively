export interface Funnel {
  uuid: string;
  name: string;
  createdAt: Date;
  environmentUuid: string;
}

export interface FunnelChart {
  funnel: Funnel;
  funnelStats: Array<{
    event: string;
    count: number;
  }>;
}
