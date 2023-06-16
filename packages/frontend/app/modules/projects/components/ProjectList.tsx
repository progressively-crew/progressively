import { CardEntity } from "~/components/Entity/Entity";
import { Tag } from "~/components/Tag";
import { Typography } from "~/components/Typography";
import { UserProject } from "../types";
import { IconBox } from "~/components/IconBox";
import { ProjectIcon } from "~/components/Icons/ProjectIcon";

export interface ProjectListProps {
  projects: Array<UserProject>;
}

export const ProjectList = ({ projects }: ProjectListProps) => {
  return (
    <ul className="flex flex-col gap-4">
      {projects.map((userProject) => (
        <li key={userProject.projectId}>
          <CardEntity
            avatar={
              <IconBox content={userProject.project.name}>
                <ProjectIcon />
              </IconBox>
            }
            title={userProject.project.name}
            description={
              <Typography>
                Role in the project: <Tag size="S">{userProject.role}</Tag>
              </Typography>
            }
            link={`/dashboard/projects/${userProject.projectId}/flags`}
          />
        </li>
      ))}
    </ul>
  );
};
