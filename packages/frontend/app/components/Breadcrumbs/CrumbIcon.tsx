import { TbFolders } from "react-icons/tb";
import { EnvIcon } from "../Icons/EnvIcon";
import { FlagIcon } from "../Icons/FlagIcon";
import { ProjectIcon } from "../Icons/ProjectIcon";
import { Crumb } from "./types";

interface IconWrapperProps {
  children: React.ReactNode;
  color?: string;
}

const IconWrapper = ({ children, color }: IconWrapperProps) => {
  return (
    <span className={`flex ${color || "text-indigo-700"}`}>{children}</span>
  );
};

export const CrumbIcon = ({
  crumb,
  color,
}: {
  crumb: Crumb;
  color?: string;
}) => {
  if (crumb.isRoot)
    return (
      <IconWrapper color={color}>
        <TbFolders />
      </IconWrapper>
    );

  if (crumb.isEnv)
    return (
      <IconWrapper color={color}>
        <EnvIcon />
      </IconWrapper>
    );

  if (crumb.isFlag)
    return (
      <IconWrapper color={color}>
        <FlagIcon />
      </IconWrapper>
    );

  if (crumb.isProject)
    return (
      <IconWrapper color={color}>
        <ProjectIcon />
      </IconWrapper>
    );

  return null;
};
