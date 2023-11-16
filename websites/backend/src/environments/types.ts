export interface Environment {
  uuid: string;
  name: string;
  projectId: string;
  clientKey: string;
}

export interface MetricDto {
  name: string;
  variantId?: string;
}
