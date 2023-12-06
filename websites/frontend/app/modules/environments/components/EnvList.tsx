import { IconBox } from "~/components/IconBox";
import { useRef } from "react";
import { Table, Tbody, Td, Th, Tr } from "~/components/Table";
import { Form, Link } from "@remix-run/react";
import { Environment } from "../types";
import { EnvIcon } from "~/components/Icons/EnvIcon";
import { ButtonCopy } from "~/components/ButtonCopy";
import { Button } from "~/components/Buttons/Button";
import { useProject } from "~/modules/projects/contexts/useProject";
import { UserRoles } from "~/modules/projects/types";

export interface EnvListProps {
  environments: Array<Environment>;
  projectId: string;
}

export interface EnvEntryProps {
  env: Environment;
  projectId: string;
  canRotate?: boolean;
}

const EnvEntry = ({ env, projectId, canRotate }: EnvEntryProps) => {
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
          to={`/dashboard/projects/${projectId}/environments/${env.uuid}/settings`}
        >
          {env.name}
        </Link>
      </Td>
      <Td>{env.domain || "N/A"}</Td>
      <Td>
        <ButtonCopy toCopy={env.clientKey} size="S">
          {env.clientKey}
        </ButtonCopy>
      </Td>
      <Td>
        <ButtonCopy
          toCopy={env.secretKey}
          toCopyAlternative="**************"
          size="S"
        >
          **************
        </ButtonCopy>
      </Td>

      {canRotate && (
        <Td style={{ width: 100 }}>
          <Button
            type="submit"
            form={`rotate-${env.uuid}`}
            onClick={(e) => e.stopPropagation()}
            variant="tertiary"
            name="envId"
            value={env.uuid}
          >
            Rotate secret key
          </Button>
        </Td>
      )}
    </Tr>
  );
};

export const EnvList = ({ environments, projectId }: EnvListProps) => {
  const { userRole } = useProject();
  const canRotate = userRole === UserRoles.Admin;

  return (
    <>
      {environments.map((env) => (
        <Form
          key={`rotate-${env.uuid}`}
          id={`rotate-${env.uuid}`}
          method="post"
        />
      ))}

      <Table noBorder>
        <caption className="sr-only">Enviroment list for the project</caption>
        <thead>
          <tr>
            <Th>
              <span className="sr-only">Environment icon</span>
            </Th>
            <Th>Environment name</Th>
            <Th>Domain (client)</Th>
            <Th>Client key</Th>
            <Th>Secret key</Th>
            {canRotate && <Th>Actions</Th>}
          </tr>
        </thead>
        <Tbody>
          {environments.map((env) => (
            <EnvEntry
              key={env.uuid}
              env={env}
              projectId={projectId}
              canRotate={canRotate}
            />
          ))}
        </Tbody>
      </Table>
    </>
  );
};
