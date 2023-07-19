import { Tag } from "~/components/Tag";
import { FlagStatus as FlagStatusRaw } from "../types";

export interface FlagStatusProps {
  value: FlagStatusRaw;
}

export const FlagStatus = ({ value }: FlagStatusProps) => {
  if (value === FlagStatusRaw.ACTIVATED) {
    return (
      <Tag variant="SUCCESS" size="S">
        Activated
      </Tag>
    );
  }

  if (value === FlagStatusRaw.NOT_ACTIVATED) {
    return (
      <Tag variant="DEFAULT" size="S">
        Not activated
      </Tag>
    );
  }

  return <Tag>Inactive</Tag>;
};
