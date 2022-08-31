import { useRef } from "react";
import { ButtonCopy } from "~/components/ButtonCopy";
import { Link } from "~/components/Link";
import { RawTable, Tr } from "~/components/RawTable";
import { FlagEnv } from "../types";
import { FlagStatus } from "./FlagStatus";

export interface FlagListProps {
  flags: Array<FlagEnv>;
  projectId: string;
  envId: string;
}

interface FlagRowProps {
  flagEnv: FlagEnv;
  projectId: string;
  envId: string;
}

const FlagRow = ({ flagEnv, projectId, envId }: FlagRowProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null);

  return (
    <Tr onClick={() => linkRef.current?.click()}>
      <td>
        <Link
          ref={linkRef}
          to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagEnv.flagId}`}
        >
          {flagEnv.flag.name}
        </Link>
      </td>
      <td>
        <div>{flagEnv.flag.description}</div>
      </td>
      <td>
        <div>
          <FlagStatus value={flagEnv.status} />
        </div>
      </td>
      <td>
        <ButtonCopy toCopy={flagEnv.flag.key} small={true}>
          {flagEnv.flag.key}
        </ButtonCopy>
      </td>
    </Tr>
  );
};

export const FlagList = ({ flags, projectId, envId }: FlagListProps) => {
  return (
    <RawTable>
      <thead>
        <tr>
          <th>Name</th>
          <th width="30%">Description</th>
          <th>Status</th>
          <th>Flag key</th>
        </tr>
      </thead>
      <tbody>
        {flags.map((flagEnv) => (
          <FlagRow
            flagEnv={flagEnv}
            projectId={projectId}
            envId={envId}
            key={flagEnv.flagId}
          />
        ))}
      </tbody>
    </RawTable>
  );
};
