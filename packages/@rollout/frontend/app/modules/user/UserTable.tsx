import { Badge, Button, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { Form, useTransition } from "remix";
import { Cell, Col, Row, Table, Tbody, Thead } from "../a11y/Table";
import { useHydrated } from "../misc/useHydrated";
import { UserProject, UserRoles } from "../projects/types";
import { FaTrash } from "react-icons/fa";

export interface UserTableProps {
  userProjects: Array<UserProject>;
  labelledBy: string;
  canEdit: boolean;
}

const RoleBadge = ({ role }: { role: UserRoles }) => {
  switch (role) {
    case UserRoles.Admin:
      return <Badge colorScheme="brand">{role}</Badge>;

    default:
      return <Badge>{role}</Badge>;
  }
};

export const UserTable = ({
  userProjects,
  labelledBy,
  canEdit,
}: UserTableProps) => {
  const isHydrated = useHydrated();
  const transition = useTransition();
  const [selected, setSelected] = useState<Array<string>>([]);

  const canDelete = selected.length > 0;

  return (
    <Form method="post">
      <input type="hidden" name="_method" value="delete-member" />

      {canEdit && (
        <Flex justifyContent={["center", "flex-end"]}>
          <Button
            colorScheme="error"
            type={canDelete || !isHydrated ? "submit" : "button"}
            aria-disabled={isHydrated && !canDelete}
            leftIcon={<FaTrash aria-hidden />}
            variant="outline"
            mb={[6, 2]}
            size="md"
            isLoading={transition.state === "submitting"}
            loadingText="Deleting the member(s), please wait..."
            disabled={false}
          >
            Remove from project
          </Button>
        </Flex>
      )}

      <Table labelledBy={labelledBy} onSelect={setSelected} selected={selected}>
        <Thead disabled={!canEdit}>
          <Col>Full name</Col>
          <Col>Email</Col>
          <Col>Role</Col>
        </Thead>
        <Tbody>
          {userProjects.map((userProject) => (
            <Row
              selection={userProject.userId}
              key={userProject.userId}
              disabled={!canEdit}
            >
              <Cell>{userProject.user?.fullname}</Cell>
              <Cell>{userProject.user?.email}</Cell>
              <Cell>
                <RoleBadge role={userProject.role} />
              </Cell>
            </Row>
          ))}
        </Tbody>
      </Table>
    </Form>
  );
};
