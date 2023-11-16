import { editSegment } from "../services/editSegment";

export const editSegmentAction = async (
  formData: FormData,
  segmentId: string,
  authCookie: string
  // eslint-disable-next-line sonarjs/cognitive-complexity
) => {
  const name = formData.get("name");

  if (!name) {
    return {
      errors: {
        invalidField: "Name is a mandatory field",
      },
    };
  }

  const updatedSegment = await editSegment(
    name.toString(),
    segmentId,
    authCookie
  );

  return {
    segment: updatedSegment,
  };
};
