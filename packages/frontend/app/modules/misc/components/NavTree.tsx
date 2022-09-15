import { IoMdClose } from "react-icons/io";
import { useNavToggle } from "~/components/Breadcrumbs/hooks/useNavToggle";
import { Dialog, DialogTitle, DialogCloseButton } from "~/components/Dialog";
import { FocusTrap } from "~/components/FocusTrap";
import { HStack } from "~/components/HStack";
import { EnvIcon } from "~/components/Icons/EnvIcon";
import { FlagIcon } from "~/components/Icons/FlagIcon";
import { ProjectIcon } from "~/components/Icons/ProjectIcon";
import { Tree, TreeGroup, TreeItem } from "~/components/TreeView/Tree";
import { useProjects } from "~/modules/projects/contexts/useProjects";

export const NavTree = () => {
  const { isNavOpened, toggleNav } = useNavToggle();
  const { projects } = useProjects();

  return (
    <Dialog open={isNavOpened} onClose={toggleNav}>
      <FocusTrap isActive={isNavOpened} initialElementSelector="project-at-index-0">
        <HStack justifyContent="space-between">
          <DialogTitle>Navigate in Progressively</DialogTitle>

          <DialogCloseButton aria-label="Close navigation" onClick={toggleNav}>
            <IoMdClose aria-hidden />
          </DialogCloseButton>
        </HStack>

        <Tree label="Navigate in Progressively">
          {projects.map((up, index) => (
            <TreeItem
              id={`project-at-index-${index}`}
              onClick={toggleNav}
              to={`/dashboard/projects/${up.projectId}`}
              key={up.projectId}
              group={
                <TreeGroup label={`Environments of ${up.project.name}`}>
                  {up.project.environments.map((env) => (
                    <TreeItem
                      onClick={toggleNav}
                      to={`/dashboard/projects/${up.projectId}/environments/${env.uuid}`}
                      key={env.uuid}
                      group={
                        <TreeGroup label={`Flags of ${env.name}`}>
                          {env.flagEnvironment?.map((flagEnv) => (
                            <TreeItem
                              to={`/dashboard/projects/${up.projectId}/environments/${env.uuid}/flags/${flagEnv.flagId}`}
                              onClick={toggleNav}
                              key={flagEnv.flagId}
                            >
                              <span style={{ width: "4rem" }} />
                              <HStack spacing={3} as="span">
                                <FlagIcon />
                                {flagEnv.flag.name}
                              </HStack>
                            </TreeItem>
                          ))}
                        </TreeGroup>
                      }
                    >
                      <span style={{ width: "2rem" }} />
                      <HStack spacing={3} as="span">
                        <EnvIcon />
                        {env.name}
                      </HStack>
                    </TreeItem>
                  ))}
                </TreeGroup>
              }
            >
              <HStack spacing={3} as="span">
                <ProjectIcon />
                {up.project.name}
              </HStack>
            </TreeItem>
          ))}
        </Tree>
      </FocusTrap>
    </Dialog>
  );
};
