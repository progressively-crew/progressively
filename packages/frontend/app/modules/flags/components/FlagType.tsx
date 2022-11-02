import { Tag } from "~/components/Tag";
import { FlagType } from "../types";

export interface FlagTypeBadgeProps {
  type: FlagType;
}

export const FlagTypeBadge = ({ type }: FlagTypeBadgeProps) => {
  if (type === FlagType.RELEASE) {
    return <Tag>Release</Tag>;
  }

  if (type === FlagType.EXPERIMENT) {
    return <Tag>Experiment</Tag>;
  }

  if (type === FlagType.PERMISSION) {
    return <Tag>Permission</Tag>;
  }

  if (type === FlagType.KILL_SWITCH) {
    return <Tag>Kill switch</Tag>;
  }

  return null;
};
