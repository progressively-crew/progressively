import { formatDateAgo } from "~/modules/misc/utils/formatDateAgo";
import { stringToColor } from "~/modules/misc/utils/stringToColor";
import { Activity } from "../types";
import { ActivityDescription } from "./ActivityDescription";
import { ActivityIcon } from "./ActivityIcon";
import { Card } from "~/components/Card";

interface ActivityItemProps {
  activity: Activity;
}

const ActivityItem = ({ activity }: ActivityItemProps) => {
  const background = stringToColor(activity.type, 90);

  return (
    <div
      className={`py-4 text-sm text-gray-600 flex flex-col md:flex-row md:justify-between md:gap-4`}
    >
      <div className="flex flex-row">
        <div
          className="w-8 h-8 flex items-center justify-center rounded-full mr-4 shrink-0"
          style={{ background }}
        >
          <ActivityIcon type={activity.type} />
        </div>

        <div className="py-1">
          <ActivityDescription activity={activity} />
        </div>
      </div>

      <p className="pl-12 md:pl-0 -mt-3 md:mt-0 flex flex-row gap-2 py-2 shrink-0 text-xs text-gray-500">
        <span>By {activity.user.fullname}</span>
        <span className="md:w-24 text-right">
          {formatDateAgo(activity.utc)}
        </span>
      </p>
    </div>
  );
};

export interface ActivityLogListProps {
  list: Array<Activity>;
}

export const ActivityLogList = ({ list }: ActivityLogListProps) => {
  return (
    <Card>
      <ul className="flex flex-col px-4">
        {list.map((item) => (
          <li key={item.id}>
            <ActivityItem activity={item} />
          </li>
        ))}
      </ul>
    </Card>
  );
};
