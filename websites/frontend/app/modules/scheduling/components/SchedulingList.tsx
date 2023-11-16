import { MenuButton } from "~/components/MenuButton";
import { FlagStatus } from "~/modules/flags/components/FlagStatus";
import { FormattedDate } from "~/modules/misc/components/FormattedDate";
import { Schedule, SchedulingStatus } from "../types";
import { Table, Tbody, Th, Tr, Td } from "~/components/Table";
import { IoPause } from "react-icons/io5";
import { BsCheck } from "react-icons/bs";

export interface SchedulingListProps {
  scheduling: Array<Schedule>;
  projectId: string;
  envId: string;
  flagId: string;
}
export const SchedulingList = ({
  scheduling,
  projectId,
  envId,
  flagId,
}: SchedulingListProps) => {
  return (
    <Table>
      <caption className="sr-only">
        List of modifications that should happen on a given date
      </caption>
      <thead>
        <tr>
          <Th>Has run</Th>
          <Th>Date/time of modification</Th>
          <Th>New value at date</Th>
          <Th>Actions</Th>
        </tr>
      </thead>
      <Tbody>
        {scheduling.map((schedule) => (
          <Tr key={schedule.uuid}>
            <Td style={{ width: 100 }}>
              <div className="flex justify-center w-full">
                {schedule.schedulingStatus === SchedulingStatus.HAS_RUN ? (
                  <BsCheck
                    className="text-3xl text-emerald-400"
                    aria-label="The update has already run."
                  />
                ) : (
                  <IoPause
                    className="text-3xl text-slate-400"
                    aria-label="The update has not run yet."
                  />
                )}
              </div>
            </Td>
            <Td>
              <FormattedDate utc={schedule.utc} />
            </Td>
            <Td>
              <FlagStatus value={schedule.status} />
            </Td>
            <Td style={{ width: 100 }}>
              <div className="flex justify-center w-full">
                <MenuButton
                  items={[
                    {
                      label: "Remove",
                      href: `/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/scheduling/${schedule.uuid}/delete`,
                    },
                  ]}
                  label={"Actions on scheduling"}
                  variant="action"
                />
              </div>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
