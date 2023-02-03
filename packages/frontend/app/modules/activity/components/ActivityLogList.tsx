import { FlagEnv } from "~/modules/flags/types";
import { formatDateAgo } from "~/modules/misc/utils/formatDateAgo";
import { stringToColor } from "~/modules/misc/utils/stringToColor";
import { Activity } from "../types";
import { ActivityDescription } from "./ActivityDescription";
import { ActivityIcon } from "./ActivityIcon";

interface ActivityItemProps {
  activity: Activity;
  flagEnv: FlagEnv;
}

const ActivityItem = ({ activity, flagEnv }: ActivityItemProps) => {
  const background = stringToColor(activity.type, 90);

  return (
    <div
      className={`border-t border-gray-200 dark:border-slate-700 py-4 text-sm text-gray-600 flex flex-row justify-between gap-4`}
    >
      <div className="flex flex-row">
        <div
          className="w-8 h-8 flex items-center justify-center rounded-full mr-4"
          style={{ background }}
        >
          <ActivityIcon type={activity.type} />
        </div>

        <div className="py-1 dark:text-slate-200">
          <ActivityDescription activity={activity} flagEnv={flagEnv} />
        </div>
      </div>

      <p className="flex flex-row gap-2 py-2 shrink-0 text-xs text-gray-500 dark:text-slate-300">
        <span>By {activity.user.fullname}</span>
        <span className="w-24 text-right">{formatDateAgo(activity.utc)}</span>
      </p>
    </div>
  );
};

export interface ActivityLogListProps {
  list: Array<Activity>;
  flagEnv: FlagEnv;
}

export const ActivityLogList = ({ list, flagEnv }: ActivityLogListProps) => {
  return (
    <div className="flex flex-col">
      {list.map((item) => (
        <ActivityItem key={item.id} activity={item} flagEnv={flagEnv} />
      ))}
    </div>
  );
};
