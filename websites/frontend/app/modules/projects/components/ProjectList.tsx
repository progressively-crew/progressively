import { Tag } from "~/components/Tag";
import { UserProject } from "../types";
import { IconBox } from "~/components/IconBox";
import { ProjectIcon } from "~/components/Icons/ProjectIcon";
import { Table, Tbody, Td, Th, Tr } from "~/components/Table";
import { Link } from "@remix-run/react";
import { useRef } from "react";

export interface ProjectListProps {
  projects: Array<UserProject>;
}

export interface ProjectRowProps {
  project: UserProject;
}

const ProjectRow = ({ project }: ProjectRowProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  return (
    <Tr
      key={project.projectId}
      onClick={() => {
        linkRef?.current?.click();
      }}
    >
      <Td style={{ width: 40 }}>
        <IconBox content={project.project.name}>
          <ProjectIcon />
        </IconBox>
      </Td>
      <Td>
        <Link
          ref={linkRef}
          to={`/dashboard/projects/${project.projectId}/home`}
        >
          {project.project.name}
        </Link>
      </Td>
      <Td>
        <Tag>{project.role}</Tag>
      </Td>
    </Tr>
  );
};

export const ProjectList = ({ projects }: ProjectListProps) => {
  return (
    <Table>
      <caption className="sr-only">List of your projects</caption>
      <thead>
        <tr>
          <Th>
            <span className="sr-only">Project icon</span>
          </Th>
          <Th>Project name</Th>
          <Th>Role</Th>
        </tr>
      </thead>

      <Tbody>
        {projects.map((userProject) => (
          <ProjectRow project={userProject} key={userProject.projectId} />
        ))}
      </Tbody>
    </Table>
  );
};
