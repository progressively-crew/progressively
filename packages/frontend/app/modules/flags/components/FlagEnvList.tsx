import { FlagEnv } from "../types";
import { IconBox } from "~/components/IconBox";
import { FlagIcon } from "~/components/Icons/FlagIcon";
import { FlagStatus } from "./FlagStatus";
import { useRef } from "react";
import { Table, Tbody, Td, Th, Tr } from "~/components/Table";
import { Link } from "@remix-run/react";

export interface FlagEnvListProps {
  flagEnvs: Array<FlagEnv>;
  projectId: string;
}

export interface FlagEnvEntryProps {
  flagEnv: FlagEnv;
  projectId: string;
}

const FlagEnvEntry = ({ flagEnv, projectId }: FlagEnvEntryProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const handleClick = () => linkRef.current?.click();

  return (
    <Tr key={flagEnv.flagId} onClick={handleClick}>
      <Td style={{ width: 40 }}>
        <IconBox content={flagEnv.flag.name}>
          <FlagIcon />
        </IconBox>
      </Td>
      <Td>
        <Link
          ref={linkRef}
          to={`/dashboard/projects/${projectId}/environments/${flagEnv.environmentId}/flags/${flagEnv.flagId}`}
        >
          {flagEnv.flag.name}
        </Link>
      </Td>
      <Td>
        <FlagStatus value={flagEnv.status} />
      </Td>
    </Tr>
  );
};

export const FlagEnvList = ({ flagEnvs, projectId }: FlagEnvListProps) => {
  return (
    <Table>
      <caption className="sr-only">Feature flag list for the project</caption>
      <thead>
        <tr>
          <Th>
            <span className="sr-only">Flag icon</span>
          </Th>
          <Th>Flag name</Th>
          <Th>Status</Th>
        </tr>
      </thead>
      <Tbody>
        {flagEnvs.map((flagEnv) => (
          <FlagEnvEntry
            key={flagEnv.flagId}
            flagEnv={flagEnv}
            projectId={projectId}
          />
        ))}
      </Tbody>
    </Table>
  );
};
