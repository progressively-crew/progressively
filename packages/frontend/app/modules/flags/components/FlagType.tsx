import { Tag } from "~/components/Tag";
import { FlagType } from "../types";

export interface FlagTypeBadgeProps {
  type: FlagType;
}

export const FlagTypeBadge = ({ type }: FlagTypeBadgeProps) => {
  if (type === FlagType.RELEASE) {
    return (
      <Tag color="apollo" background="releaseBg">
        Release
      </Tag>
    );
  }

  if (type === FlagType.EXPERIMENT) {
    return (
      <Tag color="apollo" background="experimentBg">
        Experiment
      </Tag>
    );
  }

  if (type === FlagType.PERMISSION) {
    return (
      <Tag color="apollo" background="permissionBg">
        Permission
      </Tag>
    );
  }

  if (type === FlagType.KILL_SWITCH) {
    return (
      <Tag color="apollo" background="killSwitchBg">
        Kill switch
      </Tag>
    );
  }

  return null;
};
