import { Tag } from "~/components/Tag";
import { FlagStatus as FlagStatusRaw } from "../types";

export interface FlagStatusProps {
  value: FlagStatusRaw;
}

export const FlagStatus = ({ value }: FlagStatusProps) => {
  if (value === FlagStatusRaw.ACTIVATED) {
    return <Tag>Activated</Tag>;
  }

  if (value === FlagStatusRaw.NOT_ACTIVATED) {
    return <Tag>Not activated</Tag>;
  }

  return <Tag>Inactive</Tag>;
};
