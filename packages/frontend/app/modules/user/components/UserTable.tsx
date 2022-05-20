import { useState } from "react";
import { Form, Link, useTransition } from "remix";
import { Cell, Col, Row, Table, Tbody, Thead } from "../../a11y/Table";
import { useHydrated } from "../../misc/hooks/useHydrated";
import { UserProject, UserRoles } from "../../projects/types";
import { FaTrash } from "react-icons/fa";
import { Button } from "~/components/Button";
import { IoIosCreate } from "react-icons/io";
import { Badge } from "~/components/Badge";

export interface UserTableProps {
  projectId: string;
  userProjects: Array<UserProject>;
  labelledBy: string;
  canEdit: boolean;
}

export const UserTable = ({
  userProjects,
  projectId,
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
        <>
          <Button
            colorScheme="brand"
            as={Link}
            to={`/dashboard/projects/${projectId}/add-member`}
            leftIcon={<IoIosCreate aria-hidden />}
            variant="outline"
            mb={[2, 0]}
          >
            Add member
          </Button>

          <Button
            colorScheme="error"
            type={canDelete || !isHydrated ? "submit" : "button"}
            aria-disabled={isHydrated && !canDelete}
            leftIcon={<FaTrash aria-hidden />}
            variant="outline"
            isLoading={transition.state === "submitting"}
            loadingText="Deleting the member(s), please wait..."
            disabled={false}
          >
            Remove from project
          </Button>
        </>
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
                <Badge>{userProject.role}</Badge>
              </Cell>
            </Row>
          ))}
        </Tbody>
      </Table>
    </Form>
  );
};
