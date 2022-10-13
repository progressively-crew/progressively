import { useRef } from "react";
import { Link } from "~/components/Link";
import { RawTable, Tr } from "~/components/RawTable";
import { Tag } from "~/components/Tag";
import { useHydrated } from "~/modules/misc/hooks/useHydrated";
import { UserProject } from "../types";

export interface ProjectListProps {
  projects: Array<UserProject>;
}

interface ProjectRowProps {
  userProject: UserProject;
}
const ProjectRow = ({ userProject }: ProjectRowProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const isHydrated = useHydrated();

  return (
    <Tr onClick={() => linkRef.current?.click()} isClickable={isHydrated}>
      <td>
        <Link ref={linkRef} to={`/dashboard/projects/${userProject.projectId}`}>
          {userProject.project.name}
        </Link>
      </td>
      <td>
        <Tag>{userProject.role}</Tag>
      </td>
    </Tr>
  );
};
export const ProjectList = ({ projects }: ProjectListProps) => {
  return (
    <RawTable aria-label="Projects you are part of">
      <thead>
        <tr>
          <th width="80%">Name</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((userProject) => (
          <ProjectRow key={userProject.projectId} userProject={userProject} />
        ))}
      </tbody>
    </RawTable>
  );
};
