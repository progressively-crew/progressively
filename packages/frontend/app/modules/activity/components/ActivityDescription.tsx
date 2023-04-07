/* eslint-disable sonarjs/cognitive-complexity */
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
    return (
      <p>
        <strong>Flag status</strong> has been changed to{" "}
        <FlagStatus value={data.status} />.
      </p>
    );
  }

  if (type === "change-flag-percentage") {
    return (
      <p>
        <strong>Percentage</strong> updated to <Tag size="S">{data}%</Tag>.
      </p>
    );
  }

  if (type === "change-variants-percentage") {
    return (
      <div>
        <strong>Variants percentage</strong> have been updated to the following:
        <ul className="list-disc pl-4">
          {data.map((variant: any) => (
            <li key={`${id}-${variant.uuid}`} className="pt-1">
              Variant {variant.value}:{" "}
              <strong>{variant.rolloutPercentage}%</strong>{" "}
              {variant.isControl ? <strong>(control)</strong> : ""}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (type === "delete-webhook") {
    return (
      <p>
        <strong>A webhook</strong> has been deleted:{" "}
        <Link href={data.endpoint} target="_blank" rel="noopener noreferrer">
          {data.endpoint}
        </Link>{" "}
        when <WebhookEvent value={data.event} />.
      </p>
    );
  }

  if (type === "delete-variant") {
    return (
      <p>
        <strong>The variant</strong> {data.value} has been deleted.
      </p>
    );
  }

  if (type === "create-webhook") {
    return (
      <p>
        <strong>A webhook</strong> has been created: trigger{" "}
        <Link href={data.endpoint} target="_blank" rel="noopener noreferrer">
          {data.endpoint}
        </Link>{" "}
        when <WebhookEvent value={data.event} />.
      </p>
    );
  }

  if (type === "delete-scheduling") {
    return (
      <p>
        <strong>The scheduling</strong> supposed to run on{" "}
        <FormattedDate utc={data.utc} /> has been removed.
      </p>
    );
  }

  if (type === "create-scheduling") {
    if (data.status === FlagStatusType.NOT_ACTIVATED) {
      return (
        <p>
          <strong>A scheduling</strong> has been created. It will{" "}
          <strong>deactivate</strong> the flag on the{" "}
          <strong>
            <FormattedDate utc={data.utc} />
          </strong>
        </p>
      );
    }

    if (data.type === SchedulingType.UpdateVariantPercentage) {
      const getVariantValue = (variantId: string) =>
        flagEnv.variants.find((variant) => variant.uuid === variantId)?.value;

      return (
        <div>
          <strong>A scheduling</strong> has been created. It will{" "}
          <strong>activate</strong> the flag on the{" "}
          <strong>
            <FormattedDate utc={data.utc} />
          </strong>{" "}
          with the variant values:{" "}
          <ul className="list-disc pl-4">
            {data.data.map((variant: any) => (
              <li key={`${id}-${variant.variantId}`} className="pt-1">
                Variant {getVariantValue(variant.variantId) || "N/A"}:{" "}
                <strong>{variant.variantNewPercentage}%</strong>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    return (
      <p>
        <strong>A scheduling</strong> has been created. It will{" "}
        <strong>activate</strong> the flag and target{" "}
        <strong>{data.data.rolloutPercentage}%</strong> of the audience on the{" "}
        <strong>
          <FormattedDate utc={data.utc} />
        </strong>
        .
      </p>
    );
  }

  if (type === "create-metric") {
    return (
      <p>
        <strong>A metric</strong> has been created:{" "}
        <Link to={`../metrics`}>{data.name}</Link>
      </p>
    );
  }

  if (type === "delete-metric") {
    return (
      <p>
        <strong>The metric</strong> {data.name} has been deleted.
      </p>
    );
  }

  if (type === "create-variant") {
    return (
      <p>
        <strong>A variant</strong> has been created:{" "}
        <Link to={`../`}>{data.value}</Link>
      </p>
    );
  }

  if (type === "create-segment") {
    return (
      <p>
        <strong>The segment {data.name}</strong> has been created:{" "}
        <Link to={`../segments`}>{data.name}</Link>
      </p>
    );
  }

  if (type === "delete-segment") {
    return (
      <p>
        <strong>The segment {data.name}</strong> has been deleted.
      </p>
    );
  }

  return <span>Woops, the type {type} is not supported yet.</span>;
};
