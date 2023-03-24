import { Form, useNavigation } from "@remix-run/react";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { Spinner } from "~/components/Spinner";

export interface AddCiteriaButtonProps {
  variant: "full" | "simple";
}

export const AddCiteriaButton = ({ variant }: AddCiteriaButtonProps) => {
  const navigation = useNavigation();
  const type = navigation?.formData?.get("_type");
  const isCreatingEligibility = type === "create-eligibility";

  return (
    <Form method="post">
      <input type="hidden" name="_type" value="create-eligibility" />

      {variant === "full" && (
        <button
          type="submit"
          className="p-2 border rounded border-dashed border-gray-300 text-center w-full text-gray-600 active:bg-gray-100 hover:bg-gray-50 dark:text-slate-200 dark:active:bg-slate-600 dark:hover:bg-slate-700"
          aria-disabled={isCreatingEligibility}
          aria-label={
            isCreatingEligibility
              ? "Creating a new eligibility rule..."
              : undefined
          }
        >
          <span className="flex flex-row justify-center items-center  gap-4">
            {isCreatingEligibility && <Spinner className="-ml-8" />}
            Add a new eligibility criteria
          </span>
        </button>
      )}

      {variant === "simple" && (
        <SubmitButton
          variant="secondary"
          isLoading={isCreatingEligibility}
          loadingText="Creating a new eligibility rule..."
        >
          Add a new rule
        </SubmitButton>
      )}
    </Form>
  );
};
