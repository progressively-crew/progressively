import { useRef } from "react";
import { ButtonCopy } from "~/components/ButtonCopy";
import { Link } from "~/components/Link";
import { RawTable, Tr } from "~/components/RawTable";
import { Environment } from "../types";
import { useHydrated } from "~/modules/misc/hooks/useHydrated";

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
  const isHydrated = useHydrated();

  return (
    <Tr onClick={() => linkRef.current?.click()} isClickable={isHydrated}>
      <td>
        <Link ref={linkRef} to={`/dashboard/projects/${projectId}/environments/${env.uuid}`}>
          {env.name}
        </Link>
      </td>
      <td>
        <ButtonCopy toCopy={env.clientKey} small={true}>
          {env.clientKey}
        </ButtonCopy>
      </td>
    </Tr>
  );
};
export const EnvList = ({ environments, projectId }: EnvListProps) => {
  return (
    <RawTable>
      <thead>
        <tr>
          <th width="50%">Name</th>
          <th>Client key</th>
        </tr>
      </thead>
      <tbody>
        {environments.map((env) => (
          <EnvRow key={env.uuid} env={env} projectId={projectId} />
        ))}
      </tbody>
    </RawTable>
  );
};
