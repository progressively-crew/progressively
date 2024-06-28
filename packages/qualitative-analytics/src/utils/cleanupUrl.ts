export const cleanUrl = (url: string) => {
  const urlObj = new URL(url);

  // Remove the __progressivelyProjectId search parameter if it exists
  urlObj.searchParams.delete("__progressivelyProjectId");

  // Remove the #__progressively hash if it exists
  if (urlObj.hash.indexOf("#__progressively") !== -1) {
    urlObj.hash = "";
  }

  return urlObj.toString();
};
