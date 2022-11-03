import { useState } from "react";
import { Cell, Col, Row, Table, Tbody, Thead } from "../../a11y/Table";
import { UserProject } from "../../projects/types";
import { Tag } from "~/components/Tag";
import { ButtonCopy } from "~/components/ButtonCopy";

export interface UserTableProps {
  userProjects: Array<UserProject>;
  labelledBy: string;
  canEdit: boolean;
}

export const UserTable = ({
  userProjects,
  labelledBy,
  canEdit,
}: UserTableProps) => {
  const [selected, setSelected] = useState<Array<string>>([]);

  return (
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
            <Cell>
              <ButtonCopy toCopy={userProject.user?.email || ""}>
                {userProject.user?.email}
              </ButtonCopy>
            </Cell>
            <Cell>
              <Tag>{userProject.role}</Tag>
            </Cell>
          </Row>
        ))}
      </Tbody>
    </Table>
  );
};
