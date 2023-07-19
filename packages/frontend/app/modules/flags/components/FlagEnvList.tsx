import { Entity } from "~/components/Entity/Entity";
import { FlagEnv } from "../types";
import { ButtonCopy } from "~/components/ButtonCopy";
import { IconBox } from "~/components/IconBox";
import { FlagIcon } from "~/components/Icons/FlagIcon";
import { EntityField } from "~/components/Entity/EntityField";
import { FlagStatus } from "./FlagStatus";
import { useRef } from "react";

export interface FlagEnvListProps {
  flagEnvs: Array<FlagEnv>;
  projectId: string;
}

export interface FlagEnvEntryProps {
  flagEnv: FlagEnv;
  projectId: string;
}

const FlagEnvEntry = ({ flagEnv, projectId }: FlagEnvEntryProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const handleClick = () => linkRef.current?.click();

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer hover:bg-slate-50 active:bg-slate-100 dark:hover:bg-slate-700 dark:active:bg-slate-600"
    >
      <Entity
        linkRef={linkRef}
        link={`/dashboard/projects/${projectId}/environments/${flagEnv.environmentId}/flags/${flagEnv.flagId}`}
        avatar={
          <IconBox content={flagEnv.flag.name}>
            <FlagIcon />
          </IconBox>
        }
        title={flagEnv.flag.name}
        description={flagEnv.flag.description}
        actions={
          <>
            <div className="hidden md:block">
              <ButtonCopy toCopy={flagEnv.flag.key}>
                {flagEnv.flag.key}
              </ButtonCopy>
            </div>
          </>
        }
      >
        <EntityField
          name={"Flag status"}
          value={<FlagStatus value={flagEnv.status} />}
        />
      </Entity>
    </div>
  );
};

export const FlagEnvList = ({ flagEnvs, projectId }: FlagEnvListProps) => {
  return (
    <ul className="flex flex-col gap-4">
      {flagEnvs.map((flagEnv) => (
        <li key={flagEnv.flagId}>
          <FlagEnvEntry flagEnv={flagEnv} projectId={projectId} />
        </li>
      ))}
    </ul>
  );
};
