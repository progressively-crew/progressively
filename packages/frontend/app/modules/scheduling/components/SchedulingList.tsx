import { AiFillCheckCircle } from "react-icons/ai";
import { TbCircle } from "react-icons/tb";
import { CardEntity } from "~/components/Entity/Entity";
import { EntityField } from "~/components/Entity/EntityField";
import { MenuButton } from "~/components/MenuButton";
import { Typography } from "~/components/Typography";
import { FlagStatus } from "~/modules/flags/components/FlagStatus";
import { useFlagEnv } from "~/modules/flags/contexts/useFlagEnv";
import { FormattedDate } from "~/modules/misc/components/FormattedDate";
import { Schedule, SchedulingStatus, SchedulingType } from "../types";

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
  const { flagEnv } = useFlagEnv();

  return (
    <div className="flex flex-col gap-4">
      {scheduling.map((schedule) => {
        const isMultiVariate =
          schedule.type === SchedulingType.UpdateVariantPercentage;

        const variantsWithPercentage = isMultiVariate
          ? flagEnv.variants.map((variant) => ({
              variantValue: variant.value,
              nextPercentage: schedule.data.find(
                (d) => d.variantId === variant.uuid
              )?.variantNewPercentage,
            }))
          : [];

        return (
          <div className="scheduling-row" key={schedule.uuid}>
            <CardEntity
              key={schedule.uuid}
              title={<FormattedDate utc={schedule.utc} />}
              avatar={
                schedule.schedulingStatus === SchedulingStatus.HAS_RUN ? (
                  <AiFillCheckCircle
                    aria-hidden
                    className="text-emerald-500 h-10 w-10"
                  />
                ) : (
                  <TbCircle
                    aria-hidden
                    className="text-gray-300 text-lg h-10 w-10"
                  />
                )
              }
              description={
                <p>
                  Updating status to <FlagStatus value={schedule.status} />
                </p>
              }
              menu={
                <MenuButton
                  items={[
                    {
                      label: "Remove",
                      href: `/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/scheduling/${schedule.uuid}/delete`,
                      noInitial: true,
                    },
                  ]}
                  label={"Actions on scheduling"}
                  variant="action"
                />
              }
            >
              <div>
                {isMultiVariate ? (
                  <EntityField
                    name=" New variants percentage"
                    value={
                      <>
                        {variantsWithPercentage.map((variant) => (
                          <span
                            key={`${schedule.uuid}-${variant.variantValue}`}
                            className="mr-1"
                          >
                            {variant.variantValue} to{" "}
                            <strong className="text-black dark:text-slate-50">
                              {variant.nextPercentage}%
                            </strong>
                          </span>
                        ))}
                      </>
                    }
                  />
                ) : (
                  <EntityField
                    name=" New rollout percentage"
                    value={
                      <strong className="text-black dark:text-slate-50">
                        {schedule.data.rolloutPercentage}%
                      </strong>
                    }
                  />
                )}
              </div>
            </CardEntity>
          </div>
        );
      })}
    </div>
  );
};
