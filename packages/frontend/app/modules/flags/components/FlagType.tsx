import { Tag } from "~/components/Tag";
import { FlagType } from "../types";

export interface FlagTypeBadgeProps {
  type: FlagType;
}

export const FlagTypeBadge = ({ type }: FlagTypeBadgeProps) => {
  if (type === FlagType.RELEASE) {
    return (
      <Tag color="apollo" background="releaseBg" small>
        Release
      </Tag>
    );
  }

  if (type === FlagType.EXPERIMENT) {
    return (
      <Tag color="apollo" background="experimentBg" small>
        Experiment
      </Tag>
    );
  }

  if (type === FlagType.PERMISSION) {
    return (
      <Tag color="apollo" background="permissionBg" small>
        Permission
      </Tag>
    );
  }

  if (type === FlagType.KILL_SWITCH) {
    return (
      <Tag color="apollo" background="killSwitchBg" small>
        Kill switch
      </Tag>
    );
  }

  return null;
};
