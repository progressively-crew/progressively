import { UserProject, UserRoles } from "../../projects/types";
import { Tag } from "~/components/Tag";
import { ButtonCopy } from "~/components/ButtonCopy";
import { Typography } from "~/components/Typography";
import { Table, Tbody, Td, Tr } from "~/components/Table";
import { MenuButton } from "~/components/MenuButton";
import { useProject } from "~/modules/projects/contexts/useProject";

export interface UserTableProps {
  userProjects: Array<UserProject>;
}

export const UserTable = ({ userProjects }: UserTableProps) => {
  const { userRole } = useProject();

  return (
    <Table>
      <caption className="sr-only">List of members of the project</caption>
      <thead>
        <tr>
          <Td>Full name</Td>
          <Td>Email</Td>
          <Td>Role</Td>
          <Td>Actions</Td>
        </tr>
      </thead>

      <Tbody>
        {userProjects.map((userProject) => (
          <Tr key={userProject.userId}>
            <Td>
              <Typography as="span">{userProject.user?.fullname}</Typography>
            </Td>
            <Td>
              <ButtonCopy size="S" toCopy={userProject.user?.email || ""}>
                {userProject.user?.email}
              </ButtonCopy>
            </Td>
            <Td>
              <Tag>{userProject.role}</Tag>
            </Td>
            <Td style={{ width: 100 }}>
              {userRole === UserRoles.Admin && (
                <div className="flex justify-center w-full">
                  <MenuButton
                    items={[
                      {
                        label: "Remove from project",
                        href: `/dashboard/projects/${userProject.projectId}/delete-member/${userProject.userId}`,
                      },
                    ]}
                    label={"Actions on user table"}
                    variant="action"
                  />
                </div>
              )}
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
