import { ExperimentIcon } from "~/components/Icons/ExperimentIcon";
import { KillSwitchIcon } from "~/components/Icons/KillSwitchIcon";
import { PermissionIcon } from "~/components/Icons/PermissionIcon";
import { ReleaseIcon } from "~/components/Icons/ReleaseIcon";
import { Tag } from "~/components/Tag";
import { FlagType } from "../types";

export interface FlagTypeBadgeProps {
  type: FlagType;
}

export const FlagTypeBadge = ({ type }: FlagTypeBadgeProps) => {
  if (type === FlagType.RELEASE) {
    return (
      <div className="inline-block">
        <Tag className="bg-violet-100 dark:bg-violet-100 text-violet-700 flex flex-row gap-2 items-center">
          <ReleaseIcon aria-hidden />
          Release
        </Tag>
      </div>
    );
  }

  if (type === FlagType.EXPERIMENT) {
    return (
      <div className="inline-block">
        <Tag className="bg-teal-100 dark:bg-teal-100 text-teal-700 flex flex-row gap-2 items-center">
          <ExperimentIcon aria-hidden />
          Experiment
        </Tag>
      </div>
    );
  }

  if (type === FlagType.PERMISSION) {
    return (
      <div className="inline-block">
        <Tag className="bg-orange-100 dark:bg-orange-100 text-orange-700 flex flex-row gap-2 items-center">
          <PermissionIcon aria-hidden />
          Permission
        </Tag>
      </div>
    );
  }

  if (type === FlagType.KILL_SWITCH) {
    return (
      <div className="inline-block">
        <Tag className="bg-stone-100 dark:bg-stone-100 text-stone-700 flex flex-row gap-2 items-center">
          <KillSwitchIcon aria-hidden />
          Kill switch
        </Tag>
      </div>
    );
  }

  return null;
};
