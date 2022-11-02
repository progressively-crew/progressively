import { Tag } from "~/components/Tag";
import { FlagStatus as FlagStatusRaw } from "../types";

export interface FlagStatusProps {
  value: FlagStatusRaw;
}

export const FlagStatus = ({ value }: FlagStatusProps) => {
  if (value === FlagStatusRaw.ACTIVATED) {
    return <Tag className="bg-emerald-100 text-emerald-700">Activated</Tag>;
  }

  if (value === FlagStatusRaw.NOT_ACTIVATED) {
    return <Tag className="bg-red-100 text-red-700">Not activated</Tag>;
  }

  return <Tag>Inactive</Tag>;
};
