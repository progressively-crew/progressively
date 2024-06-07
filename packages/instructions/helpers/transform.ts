import { codeToHtml } from "shiki";

export const transform = async (code: string) => {
  const html = await codeToHtml(code, {
    lang: "javascript",
    theme: "slack-ochin",
  });

  return html;
};
