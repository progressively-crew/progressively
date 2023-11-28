import { IconBox } from "~/components/IconBox";
import { EnvIcon } from "~/components/Icons/EnvIcon";
import { Environment } from "../types";
import { MenuButton, MenuButtonProps } from "~/components/MenuButton";
import { useParams } from "@remix-run/react";

export interface EnvMenuButtonProps {
  projectId: string;
  flagId: string;
  environments: Array<Environment>;
}

export const EnvMenuButton = ({
  projectId,
  flagId,
  environments,
}: EnvMenuButtonProps) => {
  const params = useParams();

  const activeEnv = environments.find((env) => env.uuid === params.env);

  const items: MenuButtonProps["items"] = environments.map((env) => ({
    label: env.name,
    href: `/dashboard/projects/${projectId}/environments/${env.uuid}/flags/${flagId}`,
    icon: (
      <IconBox content={env.name} size="S">
        <EnvIcon />
      </IconBox>
    ),
  }));

  return (
    <MenuButton
      position="right"
      icon={
        activeEnv ? (
          <IconBox content={activeEnv.name} size="S">
            <EnvIcon />
          </IconBox>
        ) : (
          <EnvIcon />
        )
      }
      items={items}
      label="Environments"
    >
      {activeEnv?.name || "Environments"}
    </MenuButton>
  );
};
