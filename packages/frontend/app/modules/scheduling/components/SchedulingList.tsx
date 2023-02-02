import { AiFillCheckCircle } from "react-icons/ai";
import { TbCircle } from "react-icons/tb";
import { CardEntity } from "~/components/Entity/Entity";
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
          <CardEntity
            key={schedule.uuid}
            title={<FormattedDate utc={schedule.utc} />}
            avatar={
              schedule.schedulingStatus === SchedulingStatus.HAS_RUN ? (
                <AiFillCheckCircle
                  aria-hidden
                  className="text-emerald-500 mt-1"
                />
              ) : (
                <TbCircle aria-hidden className="text-gray-300 mt-1" />
              )
            }
            description={
              <p>
                Updating status to <FlagStatus value={schedule.status} />
              </p>
            }
            actions={
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
                <>
                  <Typography className="text-sm">
                    New variants percentage
                  </Typography>

                  {variantsWithPercentage.map((variant) => (
                    <Typography
                      as="span"
                      className="text-sm mr-2"
                      key={`${schedule.uuid}-${variant.variantValue}`}
                    >
                      {variant.variantValue} to{" "}
                      <strong className="text-black dark:text-slate-50">
                        {variant.nextPercentage}%
                      </strong>
                    </Typography>
                  ))}
                </>
              ) : (
                <>
                  <Typography className="text-sm">
                    New rollout percentage
                  </Typography>
                  <Typography className="text-sm" as="span">
                    <strong className="text-black dark:text-slate-50">
                      {schedule.data.rolloutPercentage}%
                    </strong>
                  </Typography>
                </>
              )}
            </div>
          </CardEntity>
        );
      })}
    </div>
  );
};
