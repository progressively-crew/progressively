import fs from "fs";
import { marked } from "marked";

export interface EnhancedSyntax {
  [key: string]: string | undefined | null;
}

export function toMarkdown(
  filePath: string,
  enhancedSyntax: EnhancedSyntax = {}
) {
  const rawMarkdown = fs.readFileSync(filePath).toString();

  const markdown = Object.keys(enhancedSyntax).reduce(
    (acc: string, curr: string) => {
      const modifiedValue = enhancedSyntax[curr];
      const regexp = new RegExp(curr, "g");
      acc = acc.replace(regexp, modifiedValue || "");

      return acc;
    },
    rawMarkdown
  );

  const html = marked(markdown);

  return html;
}
