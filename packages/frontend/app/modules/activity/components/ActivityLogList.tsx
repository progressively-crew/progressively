import { Avatar } from "~/components/Avatar";
import { Card, CardContent } from "~/components/Card";
import { Spacer } from "~/components/Spacer";
import { FlagEnv } from "~/modules/flags/types";
import { FormattedDate } from "~/modules/misc/components/FormattedDate";
import { stringToColor } from "~/modules/misc/utils/stringToColor";
import { Activity } from "../types";
import { ActivityDescription } from "./ActivityDescription";
import { ActivityIcon } from "./ActivityIcon";
import { ActivityType } from "./ActivityType";

interface ActivityItemProps {
  activity: Activity;
  flagEnv: FlagEnv;
}

const ActivityItem = ({ activity, flagEnv }: ActivityItemProps) => {
  const iconBackground = stringToColor(activity.type, 90);

  return (
    <div className={`grid grid-cols-[160px_auto_1fr] items-center group`}>
      <div
        className="text-xs flex items-center text-gray-600 rounded-full px-4 py-2 -mr-8 font-semibold"
        style={{ background: iconBackground }}
      >
        <FormattedDate utc={activity.utc} />
      </div>

      <div
        className="relative h-full flex items-center justify-center"
        aria-hidden
      >
        <div className="w-[2px] h-1/2 bg-gray-100 group-first:bg-transparent absolute top-0 left-1/2 -translate-x-[1px]" />
        <div className="w-[2px] h-1/2 bg-gray-100 group-last:bg-transparent absolute bottom-0 left-1/2 -translate-x-[1px]" />
        <div
          className={`w-8 h-8 border-2 border-white dark:border-slate-800 rounded-full bg-gray-200 relative z-2 flex items-center justify-center text-gray-600`}
          style={{ background: iconBackground }}
        >
          <ActivityIcon type={activity.type} />
        </div>
      </div>

      <div className="flex-1 py-2 ml-4">
        <Card>
          <div className={`p-6 ${activity.data ? "pb-4" : ""}`}>
            <h2 className="font-bold dark:text-slate-100">
              <ActivityType type={activity.type} />
            </h2>
            <div className="flex flex-row gap-1 text-xs text-gray-600 items-center dark:text-slate-300">
              By <strong>{activity.user.fullname}</strong>
            </div>
          </div>
          {activity.data && (
            <div className="bg-gray-50 dark:bg-slate-700 p-6 pt-4">
              <ActivityDescription activity={activity} flagEnv={flagEnv} />
            </div>
          )}
        </Card>
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
