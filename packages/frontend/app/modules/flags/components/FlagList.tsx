import { HiOutlineCog6Tooth } from "react-icons/hi2";
import { CardEntity } from "~/components/Entity/Entity";
import { Flag } from "../types";
import { ButtonCopy } from "~/components/ButtonCopy";
import { IconBox } from "~/components/IconBox";
import { FlagIcon } from "~/components/Icons/FlagIcon";
import { Environment } from "~/modules/environments/types";
import { Button } from "~/components/Buttons/Button";
import { EnvIcon } from "~/components/Icons/EnvIcon";

export interface FlagEnvListProps {
  flags: Array<Flag>;
  projectId: string;
  environments: Array<Environment>;
}

export const FlagList = ({
  flags,
  projectId,
  environments,
}: FlagEnvListProps) => {
  return (
    <ul className="flex flex-col gap-4">
      {flags.map((flag) => (
        <li key={flag.uuid}>
          <CardEntity
            avatar={
              <IconBox content={flag.name}>
                <FlagIcon />
              </IconBox>
            }
            title={flag.name}
            description={flag.description}
            actions={
              <>
                <div className="hidden md:block">
                  <ButtonCopy toCopy={flag.key}>{flag.key}</ButtonCopy>
                </div>
              </>
            }
            footer={
              <div className="flex flex-col md:flex-row justify-between px-4 md:items-center gap-4">
                <div className="flex flex-col md:flex-row gap-4 md:items-center">
                  {environments.map((env) => (
                    <Button
                      to={`/dashboard/projects/${projectId}/environments/${env.uuid}/flags/${flag.uuid}`}
                      key={env.uuid}
                      variant="secondary"
                      icon={<EnvIcon />}
                    >
                      <span className="sr-only">See {flag.name} in</span>
                      {env.name}
                    </Button>
                  ))}
                </div>

                <Button
                  to={`/dashboard/projects/${projectId}/flags/${flag.uuid}`}
                  variant="secondary"
                  icon={<HiOutlineCog6Tooth />}
                >
                  Settings
                </Button>
              </div>
            }
          />
        </li>
      ))}
    </ul>
  );
};
