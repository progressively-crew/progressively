import { HiOutlineCog6Tooth } from "react-icons/hi2";
import { Link } from "@remix-run/react";
import { Flag } from "../types";
import { IconBox } from "~/components/IconBox";
import { FlagIcon } from "~/components/Icons/FlagIcon";
import { Button } from "~/components/Buttons/Button";
import { Table, Tbody, Td, Th, Tr } from "~/components/Table";
import { useRef } from "react";

export interface FlagListProps {
  flags: Array<Flag>;
  projectId: string;
}

export interface FlagListItemProps {
  flag: Flag;
  projectId: string;
}

export const FlagListItem = ({ flag, projectId }: FlagListItemProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null);

  return (
    <Tr
      key={flag.uuid}
      onClick={() => {
        linkRef?.current?.click();
      }}
    >
      <Td style={{ width: 40 }}>
        <IconBox content={flag.name}>
          <FlagIcon />
        </IconBox>
      </Td>
      <Td>
        <Link
          ref={linkRef}
          to={`/dashboard/projects/${projectId}/flags/${flag.uuid}/audience`}
        >
          {flag.name}
        </Link>
      </Td>

      <Td>
        <Button
          to={`/dashboard/projects/${projectId}/flags/${flag.uuid}/settings`}
          variant="secondary"
          icon={<HiOutlineCog6Tooth />}
          size="S"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          Settings
        </Button>
      </Td>
    </Tr>
  );
};

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
          <FlagListItem key={flag.uuid} flag={flag} projectId={projectId} />
        ))}
      </Tbody>
    </Table>
  );
};
