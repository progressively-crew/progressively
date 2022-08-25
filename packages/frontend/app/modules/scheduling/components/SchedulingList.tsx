import { RawTable } from "~/components/RawTable";
import { Tag } from "~/components/Tag";
import { FlagStatus } from "~/modules/flags/components/FlagStatus";

export const SchedulingList = () => {
  return (
    <RawTable>
      <thead>
        <tr>
          <th>Date</th>
          <th>Status at that date</th>
          <th>Rollout percentage at that date</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>21/06/2023 at 13:00</td>
          <td>
            <FlagStatus value={"ACTIVATED"} />
          </td>
          <td>
            <Tag>100%</Tag>
          </td>
        </tr>
      </tbody>
    </RawTable>
  );
};
