import { useState } from "react";
import { Cell, Col, Row, Table, Tbody, Thead } from "../../a11y/Table";
import { UserProject } from "../../projects/types";
import { Tag } from "~/components/Tag";
import { ButtonCopy } from "~/components/ButtonCopy";
import { Typography } from "~/components/Typography";

export interface UserTableProps {
  userProjects: Array<UserProject>;
  canEdit: boolean;
}

export const UserTable = ({ userProjects, canEdit }: UserTableProps) => {
  const [selected, setSelected] = useState<Array<string>>([]);

  return (
    <Table
      caption={"Members of the project"}
      onSelect={setSelected}
      selected={selected}
    >
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
            <Cell>
              <Typography as="span">{userProject.user?.fullname}</Typography>
            </Cell>
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
