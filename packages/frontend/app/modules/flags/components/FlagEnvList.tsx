import { Form } from "@remix-run/react";
import { ButtonCopy } from "~/components/ButtonCopy";
import { CardEntity } from "~/components/Entity/Entity";

import { FlagEnv, FlagStatus } from "../types";
import { ToggleFlag } from "./ToggleFlag";
import { IconBox } from "~/components/IconBox";
import { FlagIcon } from "~/components/Icons/FlagIcon";

export interface FlagEnvListProps {
  flags: Array<FlagEnv>;
  projectId: string;
  envId: string;
}

export const FlagEnvList = ({ flags, projectId, envId }: FlagEnvListProps) => {
  return (
    <div className="flex flex-col gap-4">
      {flags.map((flagEnv) => (
        <div key={flagEnv.flagId}>
          <Form method="post" id={`form-${flagEnv.flagId}`} />
          <CardEntity
            avatar={
              <IconBox content={flagEnv.flag.name}>
                <FlagIcon />
              </IconBox>
            }
            link={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagEnv.flagId}`}
            title={flagEnv.flag.name}
            description={flagEnv.flag.description}
            actions={
              <>
                <div className="hidden md:block">
                  <ButtonCopy toCopy={flagEnv.flag.key}>
                    {flagEnv.flag.key}
                  </ButtonCopy>
                </div>
                <div className="hidden md:block">
                  <ToggleFlag
                    isFlagActivated={flagEnv.status === FlagStatus.ACTIVATED}
                    flagId={flagEnv.flagId}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </>
            }
          />
        </div>
      ))}
    </div>
  );
};
