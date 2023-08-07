import { CardEntity } from "~/components/Entity/Entity";
import { Tag } from "~/components/Tag";
import { Typography } from "~/components/Typography";
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
    <Tr key={project.projectId} onClick={() => linkRef?.current?.click()}>
      <Td>
        <IconBox content={project.project.name}>
          <ProjectIcon />
        </IconBox>
      </Td>
      <Td>
        <Link
          ref={linkRef}
          to={`/dashboard/projects/${project.projectId}/flags`}
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
