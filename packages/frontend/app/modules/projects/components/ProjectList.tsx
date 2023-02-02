import { CardEntity } from "~/components/Entity/Entity";
import { InitialBox } from "~/components/InitialBox";
import { Tag } from "~/components/Tag";
import { Typography } from "~/components/Typography";
import { UserProject } from "../types";

export interface ProjectListProps {
  projects: Array<UserProject>;
}

export const ProjectList = ({ projects }: ProjectListProps) => {
  return (
    <div className="flex flex-col gap-4">
      {projects.map((userProject) => (
        <CardEntity
          key={userProject.projectId}
          avatar={<InitialBox content={userProject.project.name} />}
          title={userProject.project.name}
          description={
            <Typography>
              Role in the project: <Tag size="S">{userProject.role}</Tag>
            </Typography>
          }
          link={`/dashboard/projects/${userProject.projectId}`}
        />
      ))}
    </div>
  );
};
