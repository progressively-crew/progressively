import { ButtonCopy } from "~/components/ButtonCopy";
import { Link } from "~/components/Link";
import { RawTable } from "~/components/RawTable";
import { FlagEnv } from "../types";

export interface FlagListProps {
  flags: Array<FlagEnv>;
  projectId: string;
  envId: string;
}

export const FlagList = ({ flags, projectId, envId }: FlagListProps) => {
  return (
    <RawTable>
      <thead>
        <tr>
          <th>Name</th>
          <th width="50%">Description</th>
          <th>Flag key</th>
        </tr>
      </thead>
      <tbody>
        {flags.map((flagEnv) => (
          <tr key={flagEnv.flagId}>
            <td>
              <Link
                to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagEnv.flagId}`}
              >
                {flagEnv.flag.name}
              </Link>
            </td>
            <td>{flagEnv.flag.description}</td>
            <td>
              <ButtonCopy toCopy={flagEnv.flag.key} small={true}>
                {flagEnv.flag.key}
              </ButtonCopy>
            </td>
          </tr>
        ))}
      </tbody>
    </RawTable>
  );
};
