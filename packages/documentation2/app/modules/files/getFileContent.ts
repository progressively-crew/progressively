import fs from "fs";

export const getFileContent = (url: string) => {
  return fs.readFileSync(url, "utf8");
};
