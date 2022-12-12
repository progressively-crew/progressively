import { useRef } from "react";
import { Link } from "~/components/Link";
import { RawTable, Td, Th, Tr } from "~/components/RawTable";
import { Tag } from "~/components/Tag";
import { UserProject } from "../types";

export interface ProjectListProps {
  projects: Array<UserProject>;
}

interface ProjectRowProps {
  userProject: UserProject;
}
const ProjectRow = ({ userProject }: ProjectRowProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null);

  return (
    <Tr onClick={() => linkRef.current?.click()}>
      <Td>
        <Link ref={linkRef} to={`/dashboard/projects/${userProject.projectId}`}>
          {userProject.project.name}
        </Link>
      </Td>
      <Td>
        <Tag>{userProject.role}</Tag>
      </Td>
    </Tr>
  );
};
export const ProjectList = ({ projects }: ProjectListProps) => {
  return (
    <RawTable aria-label="Projects you are part of">
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>Role</Th>
        </Tr>
      </thead>
      <tbody>
        {projects.map((userProject) => (
          <ProjectRow key={userProject.projectId} userProject={userProject} />
        ))}
      </tbody>
    </RawTable>
  );
};
