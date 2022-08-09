import { useState } from "react";
import { Cell, Col, Row, Table, Tbody, Thead } from "../../a11y/Table";
import { useHydrated } from "../../misc/hooks/useHydrated";
import { UserProject } from "../../projects/types";
import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { styled } from "~/stitches.config";
import { Form, useTransition } from "@remix-run/react";
import { CreateButton } from "~/components/Buttons/CreateButton";
import { Tag } from "~/components/Tag";

export interface UserTableProps {
  projectId: string;
  userProjects: Array<UserProject>;
  labelledBy: string;
  canEdit: boolean;
}

const ActionWrapper = styled("div", {
  display: "flex",
  gap: "$spacing$4",
  marginBottom: "$spacing$4",
  "@mobile": {
    flexDirection: "column",
  },
});

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
        <ActionWrapper>
          <CreateButton to={`/dashboard/projects/${projectId}/add-member`}>
            Add member
          </CreateButton>

          <DeleteButton
            type={canDelete ? "submit" : "button"}
            aria-disabled={isHydrated && !canDelete}
            isLoading={transition.state === "submitting"}
            loadingText="Deleting the member(s), please wait..."
          >
            Remove from project
          </DeleteButton>
        </ActionWrapper>
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
                <Tag>{userProject.role}</Tag>
              </Cell>
            </Row>
          ))}
        </Tbody>
      </Table>
    </Form>
  );
};
