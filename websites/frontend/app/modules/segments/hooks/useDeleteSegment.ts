import { useNavigation } from "@remix-run/react";
import { Segment } from "../types";

export const useDeleteSegment = (segment: Segment) => {
  const navigation = useNavigation();

  const type = navigation?.formData?.get("_type");
  const deleteSegmentFormId = `delete-segment-${segment.uuid}`;

  const isDeletingStrategy =
    type === "delete-segment" &&
    navigation?.formData?.get("uuid")?.toString() === segment.uuid;

  return { isDeletingStrategy, deleteSegmentFormId };
};
