import { Form } from "@remix-run/react";
import { ButtonCopy } from "~/components/ButtonCopy";
import { CardEntity } from "~/components/Entity/Entity";
import { InitialBox } from "~/components/InitialBox";
import { FlagEnv, FlagStatus } from "../types";
import { ToggleFlag } from "./ToggleFlag";

export interface FlagListProps {
  flags: Array<FlagEnv>;
  projectId: string;
  envId: string;
}

export const FlagList = ({ flags, projectId, envId }: FlagListProps) => {
  return (
    <div className="flex flex-col gap-4">
      {flags.map((flagEnv) => (
        <div key={flagEnv.flagId}>
          <Form method="post" id={`form-${flagEnv.flagId}`} />
          <CardEntity
            avatar={<InitialBox content={flagEnv.flag.name} />}
            link={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagEnv.flagId}`}
            title={flagEnv.flag.name}
            description={flagEnv.flag.description}
            actions={
              <>
                <ButtonCopy toCopy={flagEnv.flag.key}>
                  {flagEnv.flag.key}
                </ButtonCopy>
                <ToggleFlag
                  isFlagActivated={flagEnv.status === FlagStatus.ACTIVATED}
                  flagId={flagEnv.flagId}
                  onClick={(e) => e.stopPropagation()}
                />
              </>
            }
          />
        </div>
      ))}
    </div>
  );
};
