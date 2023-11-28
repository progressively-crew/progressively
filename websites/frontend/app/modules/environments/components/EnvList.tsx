import { IconBox } from "~/components/IconBox";
import { useRef } from "react";
import { Table, Tbody, Td, Th, Tr } from "~/components/Table";
import { Link } from "@remix-run/react";
import { Environment } from "../types";
import { EnvIcon } from "~/components/Icons/EnvIcon";

export interface EnvListProps {
  environments: Array<Environment>;
  projectId: string;
}

export interface EnvEntryProps {
  env: Environment;
  projectId: string;
}

const EnvEntry = ({ env, projectId }: EnvEntryProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const handleClick = () => linkRef.current?.click();

  return (
    <Tr key={env.uuid} onClick={handleClick}>
      <Td style={{ width: 40 }}>
        <IconBox content={env.name}>
          <EnvIcon />
        </IconBox>
      </Td>
      <Td>
        <Link
          ref={linkRef}
          to={`/dashboard/projects/${projectId}/environments/${env.uuid}/flags`}
        >
          {env.name}
        </Link>
      </Td>
    </Tr>
  );
};

export const EnvList = ({ environments, projectId }: EnvListProps) => {
  return (
    <Table noBorder>
      <caption className="sr-only">Enviroment list for the project</caption>
      <thead>
        <tr>
          <Th>
            <span className="sr-only">Environment icon</span>
          </Th>
          <Th>Environment name</Th>
        </tr>
      </thead>
      <Tbody>
        {environments.map((env) => (
          <EnvEntry key={env.uuid} env={env} projectId={projectId} />
        ))}
      </Tbody>
    </Table>
  );
};
