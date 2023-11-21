import { AiOutlinePlus } from "react-icons/ai";
import { IconBox } from "~/components/IconBox";
import { EnvIcon } from "~/components/Icons/EnvIcon";
import { Environment } from "../types";
import { MenuButton } from "~/components/MenuButton";

export interface EnvMenuButtonProps {
  projectId: string;
  environments: Array<Environment>;
}

export const EnvMenuButton = ({
  projectId,
  environments,
}: EnvMenuButtonProps) => {
  const items = environments.map((env) => ({
    label: env.name,
    href: `/dashboard/projects/${projectId}/environments/${env.uuid}/flags`,
    icon: (
      <IconBox content={env.name} size="S">
        <EnvIcon />
      </IconBox>
    ),
  }));

  items.push({
    label: "Add an env",
    href: `/dashboard/projects/${projectId}/environments/create`,
    icon: <AiOutlinePlus />,
  });

  return (
    <MenuButton icon={<EnvIcon />} items={items} label="Environments">
      Environments
    </MenuButton>
  );
};
