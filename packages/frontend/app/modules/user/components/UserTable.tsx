import { useState } from "react";
import { Form, useTransition } from "remix";
import { Cell, Col, Row, Table, Tbody, Thead } from "../../a11y/Table";
import { useHydrated } from "../../misc/hooks/useHydrated";
import { UserProject } from "../../projects/types";
import { Button } from "~/components/Button";
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
          <Button to={`/dashboard/projects/${projectId}/add-member`}>
            Add member
          </Button>

          <Button
            type={canDelete || !isHydrated ? "submit" : "button"}
            aria-disabled={isHydrated && !canDelete}
            isLoading={transition.state === "submitting"}
            loadingText="Deleting the member(s), please wait..."
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
