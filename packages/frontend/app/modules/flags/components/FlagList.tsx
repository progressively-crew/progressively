import { useRef } from "react";
import { ButtonCopy } from "~/components/ButtonCopy";
import { Link } from "~/components/Link";
import { RawTable, Tr } from "~/components/RawTable";
import { Tag } from "~/components/Tag";
import { FlagEnv, FlagStatus } from "../types";

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

export interface StatusProps {
  value: FlagStatus;
}

const Status = ({ value }: StatusProps) => {
  if (value === FlagStatus.ACTIVATED) {
    return (
      <Tag color="successFg" background="successBg">
        Activated
      </Tag>
    );
  }

  if (value === FlagStatus.NOT_ACTIVATED) {
    return (
      <Tag color="errorFg" background="errorBg">
        Not activated
      </Tag>
    );
  }

  return <Tag>Inactive</Tag>;
};

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
      <td>{flagEnv.flag.description}</td>
      <td>
        <Status value={flagEnv.status} />
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
