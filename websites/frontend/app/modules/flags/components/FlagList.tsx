import { HiOutlineCog6Tooth } from "react-icons/hi2";
import { Flag } from "../types";
import { IconBox } from "~/components/IconBox";
import { FlagIcon } from "~/components/Icons/FlagIcon";
import { Button } from "~/components/Buttons/Button";
import { Table, Tbody, Td, Th, Tr } from "~/components/Table";

export interface FlagListProps {
  flags: Array<Flag>;
  projectId: string;
}

export const FlagList = ({ flags, projectId }: FlagListProps) => {
  return (
    <Table>
      <caption className="sr-only">Feature flag list for the project</caption>
      <thead>
        <tr>
          <Th>
            <span className="sr-only">Flag icon</span>
          </Th>
          <Th>Flag name</Th>
          <Th>Actions</Th>
        </tr>
      </thead>
      <Tbody>
        {flags.map((flag) => (
          <Tr key={flag.uuid}>
            <Td style={{ width: 40 }}>
              <IconBox content={flag.name}>
                <FlagIcon />
              </IconBox>
            </Td>
            <Td>{flag.name}</Td>

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
