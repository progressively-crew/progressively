import { useRef } from "react";
import { ButtonCopy } from "~/components/ButtonCopy";
import { Card, CardContent } from "~/components/Card";
import { InitialBox } from "~/components/InitialBox";
import { Link } from "~/components/Link";
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
    <Card onClick={() => linkRef.current?.click()}>
      <CardContent>
        <div className="flex flex-row justify-between items-center">
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
          <ButtonCopy toCopy={env.clientKey}>{env.clientKey}</ButtonCopy>
        </div>
      </CardContent>
    </Card>
  );
};
export const EnvList = ({ environments, projectId }: EnvListProps) => {
  return (
    <div className="flex flex-col gap-4">
      {environments.map((env) => (
        <EnvCard key={env.uuid} env={env} projectId={projectId} />
      ))}
    </div>
  );
};
