import { ActivityType as ActivityTypeDef } from "../types";

export interface ActivityTypeProps {
  type: ActivityTypeDef;
}

export const ActivityType = ({ type }: ActivityTypeProps) => {
  if (type === "change-flag-status") {
    return <span>Flag status has been changed to</span>;
  }

  if (type === "change-flag-percentage") {
    return (
      <span>
        <strong>Flag percentage</strong> has been changed.
      </span>
    );
  }

  if (type === "create-additional-audience") {
    return (
      <span>
        An <strong>additional audience</strong> has been created.
      </span>
    );
  }

  if (type === "create-eligibility-restriction") {
    return (
      <span>
        An <strong>eligibility restriction</strong> has been created.
      </span>
    );
  }

  if (type === "create-webhook") {
    return (
      <span>
        <strong>A webhook</strong> has been created.
      </span>
    );
  }

  if (type === "create-scheduling") {
    return (
      <span>
        <strong>A scheduling</strong> has been created.
      </span>
    );
  }

  if (type === "create-metric") {
    return (
      <span>
        <strong>A metric</strong> has been created.
      </span>
    );
  }

  if (type === "create-variant") {
    return (
      <span>
        <strong>A variant</strong> has been created.
      </span>
    );
  }

  return <span>Woops, the type {type} is not supported yet.</span>;
};
