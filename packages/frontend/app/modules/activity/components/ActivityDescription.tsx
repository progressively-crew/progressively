import { Link } from "~/components/Link";
import { Tag } from "~/components/Tag";
import { FlagEnv, FlagStatus as FlagStatusType } from "~/modules/flags/types";
import { FlagStatus } from "~/modules/flags/components/FlagStatus";
import { FormattedDate } from "~/modules/misc/components/FormattedDate";
import { WebhookEvent } from "~/modules/webhooks/components/WebhookEvent";
import { Activity } from "../types";
import { SchedulingType } from "~/modules/scheduling/types";

export interface ActivityDescriptionProps {
  activity: Activity;
  flagEnv: FlagEnv;
}

export const ActivityDescription = ({
  activity,
  flagEnv,
}: ActivityDescriptionProps) => {
  const { data, type, id } = activity;

  if (type === "change-flag-status") {
    return <FlagStatus value={data.status} />;
  }

  if (type === "change-flag-percentage") {
    return (
      <span>
        Percentage updated to{" "}
        <Tag variant="SUCCESS" size="S">
          {data}%
        </Tag>
      </span>
    );
  }

  if (type === "create-additional-audience") {
    return null;
  }

  if (type === "create-eligibility-restriction") {
    return null;
  }

  if (type === "create-webhook") {
    return (
      <span>
        Post on{" "}
        <Link href={data.endpoint} target="_blank" rel="noopener noreferrer">
          {data.endpoint}
        </Link>{" "}
        when <WebhookEvent value={data.event} />
      </span>
    );
  }

  if (type === "create-scheduling") {
    if (data.status === FlagStatusType.NOT_ACTIVATED) {
      return (
        <span>
          It will <strong>deactivate</strong> the flag on the{" "}
          <strong>
            <FormattedDate utc={data.utc} />
          </strong>
        </span>
      );
    }

    if (data.type === SchedulingType.UpdateVariantPercentage) {
      const getVariantValue = (variantId: string) =>
        flagEnv.variants.find((variant) => variant.uuid === variantId)?.value;

      return (
        <div>
          It will <strong>activate</strong> the flag on the{" "}
          <strong>
            <FormattedDate utc={data.utc} />
          </strong>{" "}
          with the following variant values:{" "}
          <ul className="list-disc pl-4">
            {data.data.map((variant: any) => (
              <li key={`${id}-${variant.variantId}`}>
                Variant {getVariantValue(variant.variantId) || "N/A"}:{" "}
                <strong>{variant.variantNewPercentage}%</strong>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    return (
      <span>
        It will <strong>activate</strong> the flag and target{" "}
        <strong>{data.data.rolloutPercentage}%</strong> of the audience on the{" "}
        <strong>
          <FormattedDate utc={data.utc} />
        </strong>
      </span>
    );
  }

  if (type === "create-metric") {
    return (
      <span>
        New metric: <Link to={`../metrics`}>{data.name}</Link>
      </span>
    );
  }

  if (type === "create-variant") {
    return (
      <span>
        New variant: <Link to={`../`}>{data.value}</Link>
      </span>
    );
  }

  return <span>Woops, the type {type} is not supported yet.</span>;
};
