import { Link } from "~/components/Link";
import { Tag } from "~/components/Tag";
import { FlagStatus } from "~/modules/flags/components/FlagStatus";
import { WebhookEvent } from "~/modules/webhooks/components/WebhookEvent";
import { Activity } from "../types";

export interface ActivityDescriptionProps {
  activity: Activity;
}

export const ActivityDescription = ({ activity }: ActivityDescriptionProps) => {
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

  if (type === "create-variant") {
    return (
      <p>
        <strong>A variant</strong> has been created:{" "}
        <Link to={`../`}>{data.value}</Link>
      </p>
    );
  }

  if (type === "delete-strategy") {
    return (
      <p>
        <strong>A strategy</strong> has been removed{" "}
      </p>
    );
  }

  if (type === "create-strategy") {
    return (
      <p>
        <strong>A strategy</strong> has been created.
      </p>
    );
  }

  if (type === "edit-strategy") {
    return (
      <p>
        <strong>A strategy</strong> has been edited.
      </p>
    );
  }

  if (type === "delete-rule") {
    return (
      <p>
        <strong>A rule</strong> has been deleted.
      </p>
    );
  }

  return <span>Woops, the type {type} is not supported yet.</span>;
};
