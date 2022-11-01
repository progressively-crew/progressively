import { Form } from "@remix-run/react";
import { useRef } from "react";
import { ButtonCopy } from "~/components/ButtonCopy";
import { Link } from "~/components/Link";
import { RawTable, Td, Th, Tr } from "~/components/RawTable";
import { Spacer } from "~/components/Spacer";
import { Typography } from "~/components/Typography";
import { FlagEnv, FlagStatus } from "../types";
import { FlagTypeBadge } from "./FlagType";
import { ToggleFlag } from "./ToggleFlag";

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
      <Td>
        <ToggleFlag
          isFlagActivated={flagEnv.status === FlagStatus.ACTIVATED}
          flagId={flagEnv.flagId}
          flagName={flagEnv.flag.name}
          onClick={(e) => e.stopPropagation()}
        />
      </Td>
      <Td>
        <Link
          height="ctaSmall"
          ref={linkRef}
          to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagEnv.flagId}`}
        >
          {flagEnv.flag.name}
        </Link>
        <Typography size="neptune" color="hadesLight" lineHeight="title">
          {flagEnv.flag.description}
        </Typography>

        <Spacer size={3} />
      </Td>

      <Td>
        <FlagTypeBadge type={flagEnv.flag.type} />
      </Td>

      <Td>
        <ButtonCopy toCopy={flagEnv.flag.key} small={true} variant="tertiary">
          {flagEnv.flag.key}
        </ButtonCopy>
      </Td>
    </Tr>
  );
};

export const FlagList = ({ flags, projectId, envId }: FlagListProps) => {
  return (
    <div>
      {flags.map((flagEnv) => (
        <Form
          method="post"
          key={`form-${flagEnv.flagId}`}
          id={`form-${flagEnv.flagId}`}
        />
      ))}

      <RawTable aria-label="Flags available in the environment">
        <thead>
          <Tr>
            <Th>Status</Th>
            <Th>Name</Th>
            <Th>Type</Th>
            <Th>Flag key</Th>
          </Tr>
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
    </div>
  );
};
