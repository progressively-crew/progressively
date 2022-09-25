import { useRef } from "react";
import { ButtonCopy } from "~/components/ButtonCopy";
import { Link } from "~/components/Link";
import { RawTable, Tr } from "~/components/RawTable";
import { Spacer } from "~/components/Spacer";
import { Typography } from "~/components/Typography";
import { FlagEnv, FlagStatus } from "../types";
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
      <td>
        <ToggleFlag
          isFlagActivated={flagEnv.status === FlagStatus.ACTIVATED}
          flagId={flagEnv.flagId}
        />
      </td>
      <td>
        <Link
          height="ctaSmall"
          ref={linkRef}
          to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagEnv.flagId}`}
        >
          {flagEnv.flag.name}
        </Link>
        <Typography size="neptune" color="hadesLight">
          {flagEnv.flag.description}
        </Typography>

        <Spacer size={3} />
      </td>

      <td>
        <ButtonCopy toCopy={flagEnv.flag.key} small={true} variant="tertiary">
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
          <th width="24%">Status</th>
          <th>Name</th>
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
