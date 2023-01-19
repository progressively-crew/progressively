import { UpsertEligibilityDTO } from "../types";
import { ConditionalAudience } from "./ConditionalAudience";

export interface FormEligibilityProps {
  initialEligibilites: Array<UpsertEligibilityDTO>;
  projectId: string;
  envId: string;
  flagId: string;
}

export const FormEligibility = ({
  initialEligibilites,
  projectId,
  envId,
  flagId,
}: FormEligibilityProps) => {
  return (
    <div className="flex flex-col gap-1">
      {initialEligibilites.map((el) => (
        <ConditionalAudience
          key={el.uuid}
          eligiblity={el}
          removeLink={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/eligibilities/${el.uuid}/delete`}
        />
      ))}
    </div>
  );
};
