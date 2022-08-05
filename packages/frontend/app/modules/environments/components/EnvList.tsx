import { ButtonCopy } from "~/components/ButtonCopy";
import { Link } from "~/components/Link";
import { RawTable } from "~/components/RawTable";
import { Environment } from "../types";

export interface EnvListProps {
  environments: Array<Environment>;
  projectId: string;
}

export const EnvList = ({ environments, projectId }: EnvListProps) => {
  return (
    <RawTable>
      <thead>
        <tr>
          <th>Name</th>
          <th>Client key</th>
        </tr>
      </thead>
      <tbody>
        {environments.map((env) => (
          <tr key={env.uuid}>
            <td>
              <Link
                to={`/dashboard/projects/${projectId}/environments/${env.uuid}/flags`}
              >
                {env.name}
              </Link>
            </td>
            <td>
              <ButtonCopy toCopy={env.clientKey}>{env.clientKey}</ButtonCopy>
            </td>
          </tr>
        ))}
      </tbody>
    </RawTable>
  );
};
