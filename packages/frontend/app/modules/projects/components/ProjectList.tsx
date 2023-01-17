import { useRef } from "react";
import { Card, CardContent } from "~/components/Card";
import { Link } from "~/components/Link";
import { Spacer } from "~/components/Spacer";
import { Tag } from "~/components/Tag";
import { Typography } from "~/components/Typography";
import { stringToColor } from "~/modules/misc/utils/stringToColor";
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
          <div
            className="w-12 h-12 text-xl rounded flex items-center justify-center"
            aria-hidden
            style={{
              color: stringToColor(userProject.project.name, 25),
              background: stringToColor(userProject.project.name, 90),
            }}
          >
            {userProject.project.name[0]}
          </div>

          <div className="">
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
