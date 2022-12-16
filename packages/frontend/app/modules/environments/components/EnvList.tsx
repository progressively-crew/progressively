import { useRef } from "react";
import { ButtonCopy } from "~/components/ButtonCopy";
import { Link } from "~/components/Link";
import { RawTable, Td, Th, Tr } from "~/components/RawTable";
import { Environment } from "../types";

export interface EnvListProps {
  environments: Array<Environment>;
  projectId: string;
}

interface EnvRowProps {
  env: Environment;
  projectId: string;
}
const EnvRow = ({ env, projectId }: EnvRowProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null);

  return (
    <Tr onClick={() => linkRef.current?.click()}>
      <Td>
        <Link
          ref={linkRef}
          to={`/dashboard/projects/${projectId}/environments/${env.uuid}`}
        >
          {env.name}
        </Link>
      </Td>
      <Td>
        <ButtonCopy toCopy={env.clientKey}>{env.clientKey}</ButtonCopy>
      </Td>
    </Tr>
  );
};
export const EnvList = ({ environments, projectId }: EnvListProps) => {
  return (
    <RawTable caption="Environments available for the project">
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>Client key</Th>
        </Tr>
      </thead>
      <tbody>
        {environments.map((env) => (
          <EnvRow key={env.uuid} env={env} projectId={projectId} />
        ))}
      </tbody>
    </RawTable>
  );
};
