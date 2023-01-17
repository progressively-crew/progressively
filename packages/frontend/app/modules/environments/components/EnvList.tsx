import { useRef } from "react";
import { ButtonCopy } from "~/components/ButtonCopy";
import { Card, CardContent } from "~/components/Card";
import { InitialBox } from "~/components/InitialBox";
import { Link } from "~/components/Link";
import { RawTable, Td, Th, Tr } from "~/components/RawTable";
import { Environment } from "../types";

export interface EnvListProps {
  environments: Array<Environment>;
  projectId: string;
}

interface EnvCardProps {
  env: Environment;
  projectId: string;
}
const EnvCard = ({ env, projectId }: EnvCardProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null);

  return (
    <Card
      onClick={() => linkRef.current?.click()}
      footer={<ButtonCopy toCopy={env.clientKey}>{env.clientKey}</ButtonCopy>}
    >
      <CardContent>
        <div className="flex flex-row gap-4 items-center">
          <InitialBox content={env.name} />
          <Link
            ref={linkRef}
            to={`/dashboard/projects/${projectId}/environments/${env.uuid}`}
            className="dark:text-slate-100"
          >
            {env.name}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
export const EnvList = ({ environments, projectId }: EnvListProps) => {
  return (
    <div className="grid grid-cols-3 gap-8">
      {environments.map((env) => (
        <EnvCard key={env.uuid} env={env} projectId={projectId} />
      ))}
    </div>
  );
};
