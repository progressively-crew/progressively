import { Tag } from "~/components/Tag";
import { FlagType } from "../types";

export interface FlagTypeBadgeProps {
  type: FlagType;
}

export const FlagTypeBadge = ({ type }: FlagTypeBadgeProps) => {
  if (type === FlagType.RELEASE) {
    return <Tag className="bg-violet-100 text-violet-700">Release</Tag>;
  }

  if (type === FlagType.EXPERIMENT) {
    return <Tag className="bg-teal-100 text-teal-700">Experiment</Tag>;
  }

  if (type === FlagType.PERMISSION) {
    return <Tag className="bg-orange-100 text-orange-700">Permission</Tag>;
  }

  if (type === FlagType.KILL_SWITCH) {
    return <Tag className="bg-stone-100 text-stone-700">Kill switch</Tag>;
  }

  return null;
};
