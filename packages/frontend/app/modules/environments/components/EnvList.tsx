import { ButtonCopy } from "~/components/ButtonCopy";
import { CardEntity } from "~/components/Entity/Entity";
import { InitialBox } from "~/components/InitialBox";
import { Environment } from "../types";

export interface EnvListProps {
  environments: Array<Environment>;
  projectId: string;
}

export const EnvList = ({ environments, projectId }: EnvListProps) => {
  return (
    <div className="flex flex-col gap-4">
      {environments.map((env) => (
        <CardEntity
          key={env.uuid}
          avatar={<InitialBox content={env.name} />}
          title={env.name}
          link={`/dashboard/projects/${projectId}/environments/${env.uuid}`}
          actions={
            <ButtonCopy toCopy={env.clientKey}>{env.clientKey}</ButtonCopy>
          }
        />
      ))}
    </div>
  );
};
