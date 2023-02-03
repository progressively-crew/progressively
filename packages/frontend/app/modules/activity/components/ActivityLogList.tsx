import { FlagEnv } from "~/modules/flags/types";
import { FormattedDate } from "~/modules/misc/components/FormattedDate";
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
      className={`border-t border-gray-200 py-4 text-sm text-gray-600 flex flex-row justify-between`}
    >
      <div className="flex flex-row">
        <div
          className="w-8 h-8 flex items-center justify-center rounded-full mr-4"
          style={{ background }}
        >
          <ActivityIcon type={activity.type} />
        </div>

        <div className="py-1">
          <ActivityDescription activity={activity} flagEnv={flagEnv} />
        </div>
      </div>

      <div className="flex flex-row gap-4 py-1 shrink-0">
        <span>By {activity.user.fullname}</span>
        <div className="text-xs text-gray-500 w-32">
          <FormattedDate utc={activity.utc} />
        </div>
      </div>
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
