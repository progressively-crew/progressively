import { useRef } from "react";
import { Card, CardContent } from "~/components/Card";
import { InitialBox } from "~/components/InitialBox";
import { Link } from "~/components/Link";
import { Spacer } from "~/components/Spacer";
import { Tag } from "~/components/Tag";
import { Typography } from "~/components/Typography";
import { UserProject } from "../types";

export interface ProjectListProps {
  projects: Array<UserProject>;
}

interface ProjectRowProps {
  userProject: UserProject;
}

const ProjectCard = ({ userProject }: ProjectRowProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null);

  return (
    <Card onClick={() => linkRef.current?.click()}>
      <CardContent>
        <div className="flex flex-row gap-4 items-center">
          <InitialBox content={userProject.project.name} />

          <div>
            <Link
              ref={linkRef}
              to={`/dashboard/projects/${userProject.projectId}`}
              className="dark:text-slate-100"
            >
              {userProject.project.name}
            </Link>

            <Spacer size={2} />

            <Typography className="dark:text-slate-300 text-sm">
              Role in the project: <Tag size="S">{userProject.role}</Tag>
            </Typography>
            <Spacer size={2} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export const ProjectList = ({ projects }: ProjectListProps) => {
  return (
    <div className="grid grid-cols-3 gap-8">
      {projects.map((userProject) => (
        <ProjectCard key={userProject.projectId} userProject={userProject} />
      ))}
    </div>
  );
};
