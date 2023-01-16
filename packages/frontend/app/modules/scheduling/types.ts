import { FlagStatus } from "../flags/types";

export enum SchedulingStatus {
  NOT_RUN = "NOT_RUN",
  HAS_RUN = "HAS_RUN",
}

export interface Schedule {
  utc: string;
  data: { rolloutPercentage?: number };
  status: FlagStatus;
  uuid: string;
  schedulingStatus: SchedulingStatus;
  type: SchedulingType;
}

export interface SchedulingUpdateVariantEntry {
  variantId: string;
  variantNewPercentage: number;
}

export interface SchedulingUpdatePercentageData {
  rolloutPercentage: number;
}

export type SchedulingCreateDTO = {
  utc: string;
  status: FlagStatus;
  type: SchedulingType;
} & (
  | {
      type: SchedulingType.UpdatePercentage;
      data: SchedulingUpdatePercentageData;
    }
  | {
      type: SchedulingType.UpdateVariantPercentage;
      data: Array<SchedulingUpdateVariantEntry>;
    }
);

export enum SchedulingType {
  UpdatePercentage = "UpdatePercentage",
  UpdateVariantPercentage = "UpdateVariantPercentage",
}

export const SchedulingTypes = [
  SchedulingType.UpdatePercentage,
  SchedulingType.UpdateVariantPercentage,
];
