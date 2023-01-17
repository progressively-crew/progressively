import { Tag } from "~/components/Tag";
import { FlagStatus as FlagStatusRaw } from "../types";

export interface FlagStatusProps {
  value: FlagStatusRaw;
}

export const FlagStatus = ({ value }: FlagStatusProps) => {
  if (value === FlagStatusRaw.ACTIVATED) {
    return (
      <Tag
        className="bg-emerald-100 dark:bg-emerald-100 text-emerald-700 dark:text-emerald-700 text-sm"
        size="S"
      >
        Activated
      </Tag>
    );
  }

  if (value === FlagStatusRaw.NOT_ACTIVATED) {
    return (
      <Tag className="bg-gray-100 text-gray-600 text-sm" size="S">
        Not activated
      </Tag>
    );
  }

  return <Tag>Inactive</Tag>;
};
