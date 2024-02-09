import { Constants } from "~/constants";

export const deleteVariant = (
  flagId: string,
  variantId: string,
  accessToken: string
) =>
  fetch(`${Constants.BackendUrl}/flags/${flagId}/variants/${variantId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error("You are not authorized to remove this variant.");
    }
    return res.json();
  });
