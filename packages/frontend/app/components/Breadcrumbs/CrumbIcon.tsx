import { TbFolders } from "react-icons/tb";
import { EnvIcon } from "../Icons/EnvIcon";
import { FlagIcon } from "../Icons/FlagIcon";
import { ProjectIcon } from "../Icons/ProjectIcon";
import { Crumb } from "./types";

interface IconWrapperProps {
  children: React.ReactNode;
}

const IconWrapper = ({ children }: IconWrapperProps) => {
  return <span className="flex text-indigo-700">{children}</span>;
};

export const CrumbIcon = ({ crumb }: { crumb: Crumb }) => {
  if (crumb.isRoot)
    return (
      <IconWrapper>
        <TbFolders />
      </IconWrapper>
    );

  if (crumb.isEnv)
    return (
      <IconWrapper>
        <EnvIcon />
      </IconWrapper>
    );

  if (crumb.isFlag)
    return (
      <IconWrapper>
        <FlagIcon />
      </IconWrapper>
    );

  if (crumb.isProject)
    return (
      <IconWrapper>
        <ProjectIcon />
      </IconWrapper>
    );

  return null;
};
