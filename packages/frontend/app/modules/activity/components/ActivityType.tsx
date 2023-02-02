import { ActivityType as ActivityTypeDef } from "../types";

export interface ActivityTypeProps {
  type: ActivityTypeDef;
}

export const ActivityType = ({ type }: ActivityTypeProps) => {
  if (type === "change-flag-status") {
    return <span>Flag status has been changed to</span>;
  }

  if (type === "change-flag-percentage") {
    return <span>Flag percentage has been changed.</span>;
  }

  if (type === "create-additional-audience") {
    return <span>An additional audience has been created.</span>;
  }

  if (type === "create-eligibility-restriction") {
    return <span>An eligibility restriction has been created.</span>;
  }

  if (type === "create-webhook") {
    return <span>A webhook has been created.</span>;
  }

  if (type === "create-scheduling") {
    return <span>A scheduling has been created.</span>;
  }

  if (type === "create-metric") {
    return <span>A metric has been created.</span>;
  }

  if (type === "create-variant") {
    return <span>A variant has been created.</span>;
  }

  return <span>Woops, the type {type} is not supported yet.</span>;
};
