import { useNavigation } from "@remix-run/react";
import { Strategy } from "../../types";

export const useDeleteStrategy = (strategy: Strategy) => {
  const navigation = useNavigation();

  const type = navigation?.formData?.get("_type");
  const deleteStrategyFormId = `delete-strategy-${strategy.uuid}`;

  const isDeletingStrategy =
    type === "delete-strategy" &&
    navigation?.formData?.get("uuid")?.toString() === strategy.uuid;

  return { isDeletingStrategy, deleteStrategyFormId };
};
