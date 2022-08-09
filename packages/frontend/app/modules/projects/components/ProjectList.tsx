import { Link } from "~/components/Link";
import { RawTable } from "~/components/RawTable";
import { Tag } from "~/components/Tag";
import { UserProject } from "../types";

export interface ProjectListProps {
  projects: Array<UserProject>;
}

export const ProjectList = ({ projects }: ProjectListProps) => {
  return (
    <RawTable>
      <thead>
        <tr>
          <th width="80%">Name</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((userProject) => (
          <tr key={userProject.projectId}>
            <td>
              <Link to={`/dashboard/projects/${userProject.projectId}`}>
                {userProject.project.name}
              </Link>
            </td>
            <td>
              <Tag>{userProject.role}</Tag>
            </td>
          </tr>
        ))}
      </tbody>
    </RawTable>
  );
};
