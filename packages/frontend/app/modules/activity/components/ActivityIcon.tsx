/* eslint-disable sonarjs/cognitive-complexity */
import { AiOutlineClockCircle, AiOutlineLink } from "react-icons/ai";
import { GrGroup } from "react-icons/gr";
import { FlagIcon } from "~/components/Icons/FlagIcon";
import { MetricIcon } from "~/components/Icons/MetricIcon";
import { VariantIcon } from "~/components/Icons/VariantIcon";
import { ActivityType } from "../types";

export interface ActivityIconProps {
  type: ActivityType;
}

export const ActivityIcon = ({ type }: ActivityIconProps) => {
  if (type === "change-flag-status") {
    return <FlagIcon />;
  }

  if (type === "change-flag-percentage") {
    return <FlagIcon />;
  }

  if (type === "change-variants-percentage") {
    return <VariantIcon />;
  }

  if (type === "delete-variant") {
    return <VariantIcon />;
  }

  if (type === "create-webhook") {
    return <AiOutlineLink />;
  }

  if (type === "delete-webhook") {
    return <AiOutlineLink />;
  }

  if (type === "delete-scheduling") {
    return <AiOutlineClockCircle />;
  }

  if (type === "create-scheduling") {
    return <AiOutlineClockCircle />;
  }

  if (type === "create-metric") {
    return <MetricIcon />;
  }

  if (type === "delete-metric") {
    return <MetricIcon />;
  }

  if (type === "create-variant") {
    return <VariantIcon />;
  }

  if (type === "create-segment") {
    return <GrGroup />;
  }

  if (type === "delete-segment") {
    return <GrGroup />;
  }

  return <span>Woops, the type {type} is not supported yet.</span>;
};
