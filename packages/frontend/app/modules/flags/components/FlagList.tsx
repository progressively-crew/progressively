import { HiOutlineCog6Tooth } from "react-icons/hi2";
import { Flag } from "../types";
import { IconBox } from "~/components/IconBox";
import { FlagIcon } from "~/components/Icons/FlagIcon";
import { Environment } from "~/modules/environments/types";
import { Button } from "~/components/Buttons/Button";
import { EnvIcon } from "~/components/Icons/EnvIcon";
import { Table, Tbody, Td, Th, Tr } from "~/components/Table";

export interface FlagEnvListProps {
  flags: Array<Flag>;
  projectId: string;
  environments: Array<Environment>;
}

export const FlagList = ({
  flags,
  projectId,
  environments,
}: FlagEnvListProps) => {
  return (
    <Table>
      <caption className="sr-only">Feature flag list for the project</caption>
      <thead>
        <tr>
          <Th>
            <span className="sr-only">Flag icon</span>
          </Th>
          <Th>Flag name</Th>
          <Th>Environments</Th>
          <Th>Actions</Th>
        </tr>
      </thead>
      <Tbody>
        {flags.map((flag) => (
          <Tr key={flag.uuid}>
            <Td>
              <IconBox content={flag.name}>
                <FlagIcon />
              </IconBox>
            </Td>
            <Td>{flag.name}</Td>
            <Td>
              <div className="flex flex-row gap-2 flex-wrap">
                {environments.map((env) => (
                  <Button
                    variant="secondary"
                    key={`${flag.uuid}-${env.uuid}`}
                    to={`/dashboard/projects/${projectId}/environments/${env.uuid}/flags/${flag.uuid}`}
                    icon={<EnvIcon />}
                    size="S"
                  >
                    {env.name}
                  </Button>
                ))}
              </div>
            </Td>
            <Td>
              <Button
                to={`/dashboard/projects/${projectId}/flags/${flag.uuid}`}
                variant="secondary"
                icon={<HiOutlineCog6Tooth />}
                size="S"
              >
                Settings
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
