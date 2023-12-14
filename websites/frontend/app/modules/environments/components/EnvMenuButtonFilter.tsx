import { AiOutlinePlus } from "react-icons/ai";
import { IconBox } from "~/components/IconBox";
import { EnvIcon } from "~/components/Icons/EnvIcon";
import { Environment } from "../types";
import { MenuButton, MenuButtonProps } from "~/components/MenuButton";
import { useSearchParams } from "@remix-run/react";

export interface EnvMenuButtonFilterProps {
  projectId: string;
  environments: Array<Environment>;
}

export const EnvMenuButtonFilter = ({
  projectId,
  environments,
}: EnvMenuButtonFilterProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const envId = searchParams.get("envId") || environments[0] || "";

  const setEnvId = (nextEnvId: string) =>
    setSearchParams((prev) => {
      prev.set("envId", nextEnvId);
      return prev;
    });

  const activeEnv = environments.find((env) => env.uuid === envId);

  const items: MenuButtonProps["items"] = environments.map((env) => ({
    label: env.name,
    onClick: () => setEnvId(env.uuid),
    icon: (
      <IconBox content={env.name} size="S">
        <EnvIcon />
      </IconBox>
    ),
  }));

  items.push({
    label: "Add an env",
    href: `/dashboard/projects/${projectId}/settings/environments/create`,
    icon: <AiOutlinePlus />,
  });

  return (
    <MenuButton
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
