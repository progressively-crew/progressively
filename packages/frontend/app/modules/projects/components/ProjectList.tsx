import { Link } from "~/components/Link";
import { RawTable } from "~/components/RawTable";
import { UserProject } from "../types";

export interface ProjectListProps {
  projects: Array<UserProject>;
}

export const ProjectList = ({ projects }: ProjectListProps) => {
  return (
    <RawTable>
      <thead>
        <tr>
          <th>Name</th>
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
            <td>{userProject.role}</td>
          </tr>
        ))}
      </tbody>
    </RawTable>
  );
};
